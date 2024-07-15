<?php

class User
{
    private $conn;
    private $dbTable = "utenti";
    private $username;
    private $password;
    private $email;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setUsername($username)
    {
        $this->username = $username;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }
    /**
     * Verifica se l'utente esiste nel database e se la password fornita è corretta.
     * Restituisce true se l'utente esiste e la password è corretta, altrimenti restituisce un messaggio di errore.
     * In caso di errore durante l'esecuzione della query o gestione delle eccezioni, registra il messaggio di errore nel file di log e restituisce false.
     */
    public function checkUser()
    {
        try {
            $query = "SELECT * FROM " . $this->dbTable . " WHERE username = :username";
            $statement = $this->conn->prepare($query);
            $statement->bindParam(":username", $this->username);
            $statement->execute();
            $result = $statement->fetch(PDO::FETCH_ASSOC);
            if (empty($result)) {
                return "username sbagliato";
            }
            if (password_verify($this->password, $result["password"])) {
                return true;
            } else {
                return "password sbagliata";
            }
        } catch (PDOException $ex) {
            error_log($this->dbTable . ": " . $ex->getMessage() . "\n", 3, "C:/xampp/htdocs/logServer.log");
            return false;
        }
    }
}
