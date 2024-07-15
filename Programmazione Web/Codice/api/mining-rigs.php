<?php // API progettata per gestire le operazioni CRUD con le risorse di tipo Mining Rig
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

require "C:/xampp/htdocs/config/database.php";
require "C:/xampp/htdocs/models/miningRig.php";
require "C:/xampp/htdocs/includes/utilities.php";
require "C:/xampp/htdocs/config/jwt.php";

if (isset($_SERVER["HTTP_AUTHORIZATION"])) {
    $authHeader = $_SERVER["HTTP_AUTHORIZATION"];
    $array = explode(" ", $authHeader);
    if (isset($array[1]) and is_string($array[1])) {
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
$miningRig = new MiningRig($dbConnection);
$requestMethod = $_SERVER["REQUEST_METHOD"];


switch ($requestMethod) {
    case "GET":
        if (isset($_GET["serial-number"])) {
            $miningRig->setSerialNumber(sanitizeInput($_GET["serial-number"]));
            $result = $miningRig->getSingleMiningRig();
        } else {
            $result = $miningRig->getMiningRigs();
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
        if (isset($_GET["serial-number"])) {
            $serialNumber = sanitizeInput($_GET["serial-number"]);
            $miningRig->setSerialNumber($serialNumber);
            $result = $miningRig->deleteMiningRig();
            if ($result === false) {
                http_response_code(500);
                echo json_encode(["Messaggio" => "Errore interno del server"]);
            } elseif ($result === "nessunRisultato") {
                http_response_code(404);
                echo json_encode(["Messaggio" => "MiningRig non presente"]);
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
        $miningRig->setCoin(sanitizeInput($postInput["coin"]));
        $miningRig->setRentalNumber(sanitizeInput($postInput["rentalNumber"]));
        $result = $miningRig->insertMiningRig();

        if ($result === false) {
            http_response_code(500);
            echo json_encode(["Messaggio" => "Errore interno del server"]);
        } else if ($result === "violazioneChiaveEsterna") {
            http_response_code(409);
            echo json_encode(["Messaggio" => "Violazione del vincolo di chiave esterna"]);
        } else {
            http_response_code(201);
            echo json_encode(["Messaggio" => "Dati inseriti correttamente"]);
        }
        break;

    case "PUT":
        $putInput = json_decode(file_get_contents("php://input"), true);

        $miningRig->setSerialNumber(sanitizeInput($putInput["serialNumber"]));
        $miningRig->setCoin(sanitizeInput($putInput["coin"]));
        $miningRig->setRentalNumber(sanitizeInput($putInput["rentalNumber"]));

        $result = $miningRig->updateMiningRig();

        if ($result === false) {
            http_response_code(500);
            echo json_encode(["Messaggio" => "Errore interno del server"]);
        } else if ($result == "violazioneChiaveEsterna") {
            http_response_code(409);
            echo json_encode(["Messaggio" => "Violazione del vincolo di chiave esterna"]);
        } elseif ($result == "nessunRisultato") {
            http_response_code(404);
            echo json_encode(["Messaggio" => "Mining Rig non presente"]);
        } else {
            http_response_code(204);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["Messaggio" => "Metodo non consentito"]);
}
