<?php
class Database
{
    private $host = "127.0.0.1";
    private $databaseName = "miningfarm";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection()
    {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->databaseName, $this->username, $this->password);
            $this->conn->exec("set names utf8");
            return $this->conn;
        } catch (PDOException $ex) {
            error_log("Errore durante la connessione con il database: ". $ex->getMessage() . "\n", 3, "C:/xampp/htdocs/logServer.log");
        }
    }
}
