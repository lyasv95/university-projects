<?php
require "C:/xampp/htdocs/vendor/autoload.php";

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretKey = "programmazioneWeb";
$issuerClaim = "localhost"; // Nome del server

function createJWT($username)
{
    global $issuerClaim, $secretKey;
    $issuedatClaim = time();
    $notbeforeClaim = $issuedatClaim;
    $expireClaim = $issuedatClaim + 3600; // SCADENZA IN SECONDI
    $token = array(
        "iss" => $issuerClaim, //Emittente del token
        "iat" => $issuedatClaim, //Momento in cui viene emesso il token
        "nbf" => $notbeforeClaim, //Momento dall'emissione del token prima del quale il token non è valido
        "exp" => $expireClaim, //Scadenza del token
        "data" => array(
            "username" => $username
        )
    );
    $jwt = JWT::encode($token, $secretKey, "HS256");
    return $jwt;
}

function checkJWT($token)
{
    global $secretKey;
    try {
        // Lancia un'eccezione se il token non è valido oppure scaduto
        JWT::decode($token, new Key($secretKey, "HS256"));
        return true;
    } catch (Exception $ex) {
        return false;
    }
}
