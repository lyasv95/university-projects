<?php

/**Classe per istanziare un oggetto di tipo Noleggio, 
 * sono presenti i metodi per eseguire le operazioni CRUD.
 * Gli errori durante l'esecuzione delle query come la violazione dei vincoli d'integrità,
 * vengono registrate nel file di log.
 */
class MiningFarm
{
    private $conn;
    private $dbTable = "mining_farm";
    private $name;
    private $city;
    private $address;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getCity()
    {
        return $this->city;
    }

    public function getAddress()
    {
        return $this->address;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function setCity($city)
    {
        $this->city = $city;
    }

    public function setAddress($address)
    {
        $this->address = $address;
    }


    public function getMiningFarms()
    {
        try {
            $query = "SELECT * FROM " . $this->dbTable;
            $statement = $this->conn->prepare($query);
            $statement->execute();
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $ex) {
            error_log($this->dbTable . ": " . $ex->getMessage(), 3, "C:/xampp/htdocs/logServer.log");
            return false;
        }
    }

    public function getSingleMiningFarm()
    {
        try {
            $query = "SELECT città, indirizzo FROM " . $this->dbTable . " WHERE nome = :name";
            $statement = $this->conn->prepare($query);
            $statement->bindParam(":name", $this->name);
            $statement->execute();
            $result = $statement->fetch(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $ex) {
            error_log($this->dbTable . ": " . $ex->getMessage() . "\n", 3, "C:/xampp/htdocs/logServer.log");
            return false;
        }
    }

    public function deleteMiningFarm()
    {
        try {
            $query = "DELETE FROM " . $this->dbTable . " WHERE nome = :name";
            $statement = $this->conn->prepare($query);
            $statement->bindParam(":name", $this->name);
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

    public function insertMiningFarm()
    {
        try {
            $query = "INSERT INTO " . $this->dbTable . " SET nome = :name, città = :city, indirizzo = :address";
            $statement = $this->conn->prepare($query);
            $statement->bindParam(":name", $this->name);
            $statement->bindParam(":city", $this->city);
            $statement->bindParam(":address", $this->address);
            $statement->execute();
            return;
        } catch (PDOException $ex) {
            error_log($this->dbTable . ": " . $ex->getMessage() . "\n", 3, "C:/xampp/htdocs/logServer.log");
            // Il codice corrisponde alla violazione del vincolo di chiave primaria durante l'inserimento di un nuovo dato
            if ($ex->getCode() == 23000) {
                return "duplicato";
            } else return false;
        }
    }

    public function updateMiningFarm()
    {
        try {
            $query = "UPDATE " . $this->dbTable . " SET città = :city, indirizzo = :address WHERE nome = :name";
            $statement = $this->conn->prepare($query);
            $statement->bindParam(":name", $this->name);
            $statement->bindParam(":city", $this->city);
            $statement->bindParam(":address", $this->address);
            $statement->execute();
            $count = $statement->rowCount();
            // Se il codice fiscale non è presente allora non sarà stata fatta alcuna modifica e quindi count conterrà 0
            if ($count == 0) {
                return "nessunRisultato";
            } else return;
        } catch (PDOException $ex) {
            error_log($this->dbTable . ": " . $ex->getMessage() . "\n", 3, "C:/xampp/htdocs/logServer.log");
            return false;
        }
    }
}
