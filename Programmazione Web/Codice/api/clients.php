<?php // API progettata per gestire le operazioni CRUD con le risorse di tipo Cliente
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

require "C:/xampp/htdocs/config/database.php";
require "C:/xampp/htdocs/models/client.php";
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
$client = new Client($dbConnection);
$requestMethod = $_SERVER["REQUEST_METHOD"];

switch ($requestMethod) {
    case "GET":
        if (isset($_GET["cf"])) {
            $client->setTaxCode(sanitizeInput($_GET["cf"]));
            $result = $client->getSingleClient();
        } else {
            $result = $client->getClients();
        }

        if (empty($result)) {
            http_response_code(404);
            echo json_encode(["Messaggio" => "Nessun risultato"]);
        } else if ($result === false) {
            http_response_code(500);
            echo json_encode(["Messaggio" => "Errore interno del server"]);
        } else {
            http_response_code(200);
            echo json_encode($result);
        }
        break;

    case "DELETE":
        if (isset($_GET["cf"])) {
            $taxCode = sanitizeInput($_GET["cf"]);
            $client->setTaxCode($taxCode);
            $result = $client->deleteClient();
            if ($result === false) {
                http_response_code(500);
                echo json_encode(["Messaggio" => "Errore interno del server"]);
            } elseif ($result == "nessunRisultato") {
                http_response_code(404);
                echo json_encode(["Messaggio" => "Cliente non presente"]);
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
        $client->setName(sanitizeInput($postInput["name"]));
        $client->setSurname(sanitizeInput($postInput["surname"]));
        $client->setTaxCode(sanitizeInput($postInput["taxCode"]));
        $client->setEmail(sanitizeInput($postInput["email"]));
        $result = $client->insertClient();

        if ($result === false) {
            http_response_code(500);
            echo json_encode(["Messaggio" => "Errore interno del server"]);
        } elseif ($result == "duplicato") {
            http_response_code(409);
            echo json_encode(["Messaggio" => "Cliente già registrato"]);
        } else {
            http_response_code(201);
            echo json_encode(["Messaggio" => "Dati inseriti correttamente"]);
        }
        break;

    case "PUT":
        $putInput = json_decode(file_get_contents("php://input"), true);
        $client->setName(sanitizeInput($putInput["name"]));
        $client->setSurname(sanitizeInput($putInput["surname"]));
        $client->setTaxCode(sanitizeInput($putInput["taxCode"]));
        $client->setEmail(sanitizeInput($putInput["email"]));
        $result = $client->updateClient();

        if ($result === false) {
            http_response_code(500);
            echo json_encode(["Messaggio" => "Errore interno del server"]);
        } elseif ($result == "nessunRisultato") {
            http_response_code(404);
            echo json_encode(["Messaggio" => "Cliente non presente"]);
        } else {
            http_response_code(204);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["Messaggio" => "Metodo non consentito"]);
}
