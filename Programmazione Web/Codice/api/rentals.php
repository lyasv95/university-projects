<?php // API progettata per gestire le operazioni CRUD con le risorse di tipo Noleggio
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

require "C:/xampp/htdocs/config/database.php";
require "C:/xampp/htdocs/models/rental.php";
require "C:/xampp/htdocs/includes/utilities.php";
require "C:/xampp/htdocs/config/jwt.php";

if (isset($_SERVER["HTTP_AUTHORIZATION"])) {
    $authHeader = $_SERVER["HTTP_AUTHORIZATION"];
    $array = explode(" ", $authHeader);
    if (isset($array[1]) && is_string($array[1])) {
        $token = sanitizeInput($array[1]);
    } else {
        http_response_code(400);
        echo json_encode(["Messaggio" => "Token non riconosciuto"]);
        exit();
    }
} else {
    http_response_code(400);
    echo json_encode(["Messaggio" => "Richiesta senza autorizzazione"]);
    exit();
}

if (!checkJWT($token)) {
    http_response_code(400);
    echo json_encode(["Messaggio" => "Token non valido"]);
    exit();
}

$database = new Database();
$dbConnection = $database->getConnection();
$rental = new Rental($dbConnection);

$requestMethod = $_SERVER["REQUEST_METHOD"];

switch ($requestMethod) {
    case "GET":
        if (isset($_GET["status"]) && $_GET["status"] === "valid") {
            $result = $rental->getValidRentals();
        } elseif (isset($_GET["id"])) {
            $rental->setId(sanitizeInput($_GET["id"]));
            $result = $rental->getSingleRental();
        } else {
            $result = $rental->getRentals();
        }

        if (empty($result)) {
            http_response_code(404);
            echo json_encode(["Messaggio" => "Nessun risultato"]);
        } elseif ($result === false) {
            http_response_code(500);
            echo json_encode(["Messaggio" => "Errore interno del server"]);
        } else {
            http_response_code(200);
            echo json_encode($result);
        }
        break;

    case "DELETE":
        if (isset($_GET["id"])) {
            $id = sanitizeInput($_GET["id"]);
            $rental->setId($id);
            $result = $rental->deleteRental();
            if ($result === false) {
                http_response_code(500);
                echo json_encode(["Messaggio" => "Errore interno del server"]);
            } elseif ($result == "nessunRisultato") {
                http_response_code(404);
                echo json_encode(["Messaggio" => "Noleggio non presente"]);
            } else {
                http_response_code(204);
            }
        } else {
            http_response_code(500);
            echo json_encode(["Messaggio" => "Richiesta non valida"]);
        }
        break;

    case "POST":
        $postInput = json_decode(file_get_contents("php://input"), true);
        $rental->setStartDate(sanitizeInput($postInput["startDate"]));
        $rental->setEndDate(sanitizeInput($postInput["endDate"]));
        $rental->setClientTaxCode(sanitizeInput($postInput["clientTaxCode"]));
        $rental->setMiningFarmName(sanitizeInput($postInput["miningFarmName"]));
        $result = $rental->insertRental();

        if ($result === false) {
            http_response_code(500);
            echo json_encode(["Messaggio" => "Errore interno del server"]);
        } else if ($result == "violazioneChiaveEsterna") {
            http_response_code(409);
            echo json_encode(["Messaggio" => "Violazione del vincolo di chiave esterna"]);
        } else {
            http_response_code(201);
            echo json_encode(["Messaggio" => "Dati inseriti correttamente"]);
        }
        break;

    case "PUT":
        $putInput = json_decode(file_get_contents("php://input"), true);
        $rental->setId(sanitizeInput($putInput["id"]));
        $rental->setStartDate(sanitizeInput($putInput["startDate"]));
        $rental->setEndDate(sanitizeInput($putInput["endDate"]));
        $rental->setClientTaxCode(sanitizeInput($putInput["clientTaxCode"]));
        $rental->setMiningFarmName(sanitizeInput($putInput["miningFarmName"]));
        $result = $rental->updateRental();

        if ($result === false) {
            http_response_code(500);
            echo json_encode(["Messaggio" => "Errore interno del server"]);
        } else if ($result == "violazioneChiaveEsterna") {
            http_response_code(409);
            echo json_encode(["Messaggio" => "Violazione del vincolo di chiave esterna"]);
        } elseif ($result == "nessunRisultato") {
            http_response_code(404);
            echo json_encode(["Messaggio" => "Noleggio non presente"]);
        } else {
            http_response_code(204);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["Messaggio" => "Metodo non consentito"]);
}
