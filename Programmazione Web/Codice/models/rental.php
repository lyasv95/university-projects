<?php

/**Classe per istanziare un oggetto di tipo Noleggio, 
 * sono presenti i metodi per eseguire le operazioni CRUD.
 * Gli errori durante l'esecuzione delle query come la violazione dei vincoli d'integrità,
 * vengono registrate nel file di log.
 */
class Rental
{
    private $conn;
    private $dbTable = "noleggi";
    private $id;
    private $startDate;
    private $endDate;
    private $clientTaxCode;
    private $miningFarmName;
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getId()
    {
        return $this->id;
    }
    public function getStartDate()
    {
        return $this->startDate;
    }

    public function getEndDate()
    {
        return $this->endDate;
    }

    public function getClientTaxCode()
    {
        return $this->clientTaxCode;
    }

    public function getMiningFarmName()
    {
        return $this->miningFarmName;
    }

    public function setId($id)
    {
        $this->id = $id;
    }
    public function setStartDate($startDate)
    {
        $this->startDate = $startDate;
    }

    public function setEndDate($endDate)
    {
        $this->endDate = $endDate;
    }

    public function setClientTaxCode($clientTaxCode)
    {
        $this->clientTaxCode = $clientTaxCode;
    }

    public function setMiningFarmName($miningFarmName)
    {
        $this->miningFarmName = $miningFarmName;
    }


    public function getRentals()
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


    public function getSingleRental()
    {
        try {
            $query = "SELECT dataInizio, dataFine, codiceFiscaleCliente, nomeMiningFarm FROM " . $this->dbTable . " WHERE numero = :id";
            $statement = $this->conn->prepare($query);
            $statement->bindParam(":id", $this->id);
            $statement->execute();
            $result = $statement->fetch(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $ex) {
            error_log($this->dbTable . ": " . $ex->getMessage() . "\n", 3, "C:/xampp/htdocs/logServer.log");
            return false;
        }
    }

    //Restituisce i noleggi in corso
    public function getValidRentals()
    {
        try {
            $query = "SELECT * FROM " . $this->dbTable . " WHERE dataFine > CURDATE()";
            $statement = $this->conn->prepare($query);
            $statement->execute();
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $ex) {
            error_log($this->dbTable . ": " . $ex->getMessage() . "\n", 3, "C:/xampp/htdocs/logServer.log");
            return false;
        }
    }


    public function deleteRental()
    {
        try {
            $query = "DELETE FROM " . $this->dbTable . " WHERE numero = :id";
            $statement = $this->conn->prepare($query);
            $statement->bindParam(":id", $this->id);
            $statement->execute();
            //Restituisce il numero di record eliminati
            $count = $statement->rowCount();
            if ($count == 0) {
                return "nessunRisultato";
            } else return;
        } catch (PDOException $ex) {
            error_log($this->dbTable . ": " . $ex->getMessage() . "\n", 3, "C:/xampp/htdocs/logServer.log");
            return false;
        }
    }


    public function insertRental()
    {
        try {
            $query = "INSERT INTO " . $this->dbTable . " SET dataInizio = :startDate, dataFine = :endDate, codiceFiscaleCliente = :clientTaxCode, nomeMiningFarm = :miningFarmName";
            $statement = $this->conn->prepare($query);
            $statement->bindParam(":startDate", $this->startDate);
            $statement->bindParam(":endDate", $this->endDate);
            $statement->bindParam(":clientTaxCode", $this->clientTaxCode);
            $statement->bindParam(":miningFarmName", $this->miningFarmName);
            $statement->execute();
            return;
        } catch (PDOException $ex) {
            error_log($this->dbTable . ": " . $ex->getMessage() . "\n", 3, "C:/xampp/htdocs/logServer.log");
            if (($ex->getCode() == 23000)) {
                return "violazioneChiaveEsterna";
            } else return false;
        }
    }


    public function updateRental()
    {
        try {
            $query = "UPDATE " . $this->dbTable . " SET dataInizio = :startDate, dataFine = :endDate, codiceFiscaleCliente = :clientTaxCode, nomeMiningFarm = :miningFarmName WHERE numero = :id";
            $statement = $this->conn->prepare($query);
            $statement->bindParam(":id", $this->id);
            $statement->bindParam(":startDate", $this->startDate);
            $statement->bindParam(":endDate", $this->endDate);
            $statement->bindParam(":clientTaxCode", $this->clientTaxCode);
            $statement->bindParam(":miningFarmName", $this->miningFarmName);
            $statement->execute();
            $count = $statement->rowCount();
            if ($count == 0) {
                return "nessunRisultato";
            } else return;
        } catch (PDOException $ex) {
            error_log($this->dbTable . ": " . $ex->getMessage() . "\n", 3, "C:/xampp/htdocs/logServer.log");
            if (($ex->getCode() == 23000)) {
                return "violazioneChiaveEsterna";
            } else return false;
        }
    }
}
