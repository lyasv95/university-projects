<?php

/**Classe per istanziare un oggetto di tipo mining rig, 
 * sono presenti i metodi per eseguire le operazioni CRUD.
 * Gli errori durante l'esecuzione delle query come la violazione dei vincoli d'integrità,
 * vengono registrate nel file di log.
 */
class MiningRig
{
    private $conn;
    private $dbTable = "mining_rig";
    private $serialNumber;
    private $coin;
    private $rentalNumber;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getSerialNumber()
    {
        return $this->serialNumber;
    }
    public function getCoin()
    {
        return $this->coin;
    }

    public function getRentalNumber()
    {
        return $this->rentalNumber;
    }

    public function setSerialNumber($serialNumber)
    {
        $this->serialNumber = $serialNumber;
    }
    public function setCoin($coin)
    {
        $this->coin = $coin;
    }

    public function setRentalNumber($rentalNumber)
    {
        $this->rentalNumber = $rentalNumber;
    }

    public function getMiningRigs()
    {
        try {
            $query = "SELECT * FROM " . $this->dbTable;
            $statement = $this->conn->prepare($query);
            $statement->execute();
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $ex) {
            error_log($this->dbTable . ": " . $ex->getMessage() . "\n", 3, "C:/xampp/htdocs/logServer.log");
            return false;
        }
    }


    public function getSingleMiningRig()
    {
        try {
            $query = "SELECT moneta, numeroNoleggio FROM " . $this->dbTable . " WHERE matricola = :serialNumber";
            $statement = $this->conn->prepare($query);
            $statement->bindParam(":serialNumber", $this->serialNumber);
            $statement->execute();
            $result = $statement->fetch(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $ex) {
            error_log($this->dbTable . ": " . $ex->getMessage() . "\n", 3, "C:/xampp/htdocs/logServer.log");
            return false;
        }
    }

    public function deleteMiningRig()
    {
        try {
            $query = "DELETE FROM " . $this->dbTable . " WHERE matricola = :serialNumber";
            $statement = $this->conn->prepare($query);
            $statement->bindParam(":serialNumber", $this->serialNumber);
            $statement->execute();
            $count = $statement->rowCount();
            if ($count == 0) {
                return "nessunRisultato";
            } else return;
        } catch (PDOException $ex) {
            error_log($this->dbTable . ": " . $ex->getMessage() . "\n", 3, "C:/xampp/htdocs/logServer.log");
            return false;
        }
    }

    public function insertMiningRig()
    {
        try {
            $query = "INSERT INTO " . $this->dbTable . " SET moneta = :coin, numeroNoleggio = :rentalNumber";
            $statement = $this->conn->prepare($query);
            $statement->bindParam(":coin", $this->coin);
            $statement->bindParam(":rentalNumber", $this->rentalNumber);
            $statement->execute();
            return true;
        } catch (PDOException $ex) {
            error_log($this->dbTable . ": " . $ex->getMessage() . "\n", 3, "C:/xampp/htdocs/logServer.log");
            if (($ex->getCode() == 23000)) {
                return "violazioneChiaveEsterna";
            } else {
                return false;
            }
        }
    }

    public function updateMiningRig()
    {
        try {
            $query = "UPDATE " . $this->dbTable . " SET moneta = :coin, numeroNoleggio = :rentalNumber WHERE matricola = :serialNumber";
            $statement = $this->conn->prepare($query);
            $statement->bindParam(":coin", $this->coin);
            $statement->bindParam(":rentalNumber", $this->rentalNumber);
            $statement->bindParam(":serialNumber", $this->serialNumber);
            $statement->execute();
            $count = $statement->rowCount();
            if ($count == 0) {
                return "nessunRisultato";
            } else return;
        } catch (PDOException $ex) {
            error_log($this->dbTable . ": " . $ex->getMessage() . "\n", 3, "C:/xampp/htdocs/logServer.log");
            if (($ex->getCode() == 23000)) {
                return "violazioneChiaveEsterna";
            } else {
                return false;
            }
        }
    }
}
