<?php // API progettata per gestire le operazioni CRUD con le risorse di tipo Mining Farm
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

require "C:/xampp/htdocs/config/database.php";
require "C:/xampp/htdocs/models/miningFarm.php";
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
$miningFarm = new MiningFarm($dbConnection);
$requestMethod = $_SERVER["REQUEST_METHOD"];

switch ($requestMethod) {
    case "GET":
        if (isset($_GET["nome"])) {
            $miningFarm->setName(sanitizeInput($_GET["nome"]));
            $result = $miningFarm->getSingleMiningFarm();
        } else {
            $result = $miningFarm->getMiningFarms();
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
        if (isset($_GET["nome"])) {
            $name = sanitizeInput($_GET["nome"]);
            $miningFarm->setName($name);
            $result = $miningFarm->deleteMiningFarm();
            if ($result === false) {
                http_response_code(500);
                echo json_encode(["Messaggio" => "Errore interno del server"]);
            } elseif ($result == "nessunRisultato") {
                http_response_code(404);
                echo json_encode(["Messaggio" => "Mining Farm non presente"]);
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
        $miningFarm->setName(sanitizeInput($postInput["name"]));
        $miningFarm->setCity(sanitizeInput($postInput["city"]));
        $miningFarm->setAddress(sanitizeInput($postInput["address"]));
        $result = $miningFarm->insertMiningFarm();

        if ($result === false) {
            http_response_code(500);
            echo json_encode(["Messaggio" => "Errore interno del server"]);
        } elseif ($result == "duplicato") {
            http_response_code(409);
            echo json_encode(["Messaggio" => "Mining Farm già registrata"]);
        } else {
            http_response_code(201);
            echo json_encode(["Messaggio" => "Dati inseriti correttamente"]);
        }
        break;

    case "PUT":
        $putInput = json_decode(file_get_contents("php://input"), true);
        $miningFarm->setName(sanitizeInput($putInput["name"]));
        $miningFarm->setCity(sanitizeInput($putInput["city"]));
        $miningFarm->setAddress(sanitizeInput($putInput["address"]));
        $result = $miningFarm->updateMiningFarm();

        if ($result === false) {
            http_response_code(500);
            echo json_encode(["Messaggio" => "Errore interno del server"]);
        } elseif ($result == "nessunRisultato") {
            http_response_code(404);
            echo json_encode(["Messaggio" => "Mining Farm non presente"]);
        } else {
            http_response_code(204);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["Messaggio" => "Metodo non consentito"]);
}
