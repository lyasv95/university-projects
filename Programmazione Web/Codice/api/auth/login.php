<?php

/**
 * API progettata per gestire l'autenticazione, 
 * in caso di successo il token JWT viene inviato al client
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

require "C:/xampp/htdocs/config/database.php";
require "C:/xampp/htdocs/models/user.php";
require "C:/xampp/htdocs/includes/utilities.php";
require "C:/xampp/htdocs/vendor/autoload.php";
require "C:/xampp/htdocs/config/jwt.php";

$database = new Database();
$dbConnection = $database->getConnection();
$user = new User($dbConnection);

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod == "POST") {
    $postInput = json_decode(file_get_contents("php://input"), true);

    $user->setUsername(sanitizeInput($postInput["username"]));
    $user->setPassword(sanitizeInput($postInput["password"]));

    $result = $user->checkUser();
    if ($result === true) {
        $jwt = createJWT($user->getUsername());
        http_response_code(200);
        echo json_encode(["jwt" => $jwt]);
    } else if ($result === "username sbagliato" or $result === "password sbagliata") {
        http_response_code(401);
        echo json_encode(["messaggio" => "Credenziali errate"]);
    } else {
        http_response_code(500);
        echo json_encode(["Messaggio" => "Errore interno del server"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["Messaggio" => "Metodo non consentito"]);
}
