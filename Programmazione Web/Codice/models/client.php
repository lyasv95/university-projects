<?php
/**Classe per istanziare un oggetto di tipo Noleggio, 
 * sono presenti i metodi per eseguire le operazioni CRUD.
 * Gli errori durante l'esecuzione delle query come la violazione dei vincoli d'integrità,
 * vengono registrate nel file di log.
 */
class Client
{
    private $conn;
    private $dbTable = "clienti";
    private $name;
    private $surname;
    private $taxCode;
    private $email;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getSurname()
    {
        return $this->surname;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function getTaxCode()
    {
        return $this->taxCode;
    }
    public function setName($name)
    {
        $this->name = $name;
    }

    public function setSurname($surname)
    {
        $this->surname = $surname;
    }

    public function setTaxCode($taxCode)
    {
        $this->taxCode = $taxCode;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function getClients()
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

    public function getSingleClient()
    {
        try {
            $query = "SELECT nome, cognome, email FROM " . $this->dbTable . " WHERE codiceFiscale = :taxCode";
            $statement = $this->conn->prepare($query);
            $statement->bindParam(":taxCode", $this->taxCode);
            $statement->execute();
            $result = $statement->fetch(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $ex) {
            error_log($this->dbTable . ": " . $ex->getMessage() . "\n", 3, "C:/xampp/htdocs/logServer.log");
            return false;
        }
    }

    public function deleteClient()
    {
        try {
            $query = "DELETE FROM " . $this->dbTable . " WHERE codiceFiscale = :taxCode";
            $statement = $this->conn->prepare($query);
            $statement->bindParam(":taxCode", $this->taxCode);
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

    public function insertClient()
    {
        try {
            $query = "INSERT INTO " . $this->dbTable . " SET nome = :name, cognome = :surname, codiceFiscale = :taxCode, email = :email";
            $statement = $this->conn->prepare($query);
            $statement->bindParam(":name", $this->name);
            $statement->bindParam(":surname", $this->surname);
            $statement->bindParam(":taxCode", $this->taxCode);
            $statement->bindParam(":email", $this->email);
            $statement->execute();
            return;
        } catch (PDOException $ex) {
            error_log($this->dbTable . ": " . $ex->getMessage() . "\n", 3, "C:/xampp/htdocs/logServer.log");

            if ($ex->getCode() == 23000) {
                return "duplicato";
            } else return false;
        }
    }

    public function updateClient()
    {
        try {
            $query = "UPDATE " . $this->dbTable . " SET nome = :name, cognome = :surname, email = :email WHERE codiceFiscale = :taxCode";
            $statement = $this->conn->prepare($query);
            $statement->bindParam(":name", $this->name);
            $statement->bindParam(":surname", $this->surname);
            $statement->bindParam(":taxCode", $this->taxCode);
            $statement->bindParam(":email", $this->email);
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
}
