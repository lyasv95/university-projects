<?php

/**
 * Funzione che sanifica l'input utente per prevenire attacchi Cross Site Scripting:
 * rimuove i tag HTML e PHP, converte i caratteri speciali in entità HTML, elimina eventuali backslashes 
 * ed infine rimuove gli spazi bianchi dall'inizio e dalla fine della stringa.
 */

function sanitizeInput($data)
{
    $data = strip_tags($data);
    $data = htmlspecialchars($data);
    $data = stripslashes($data);
    $data = trim($data);
    return $data;
}
