package prg1;

import java.io.Serial;
import java.io.Serializable;

public class Person implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L; //IDENTIFICATORE UNIVOCO DELLA VERSIONE DELLA CLASSE
    private String name, lastName, personID;

    //VALIDAZIONE DEL COSTRUTTORE E DEI METODI SETTER

    public Person(String name, String lastName, String personID) {
        if (name == null || name.isEmpty() || lastName == null || lastName.isEmpty() || personID == null || personID.isEmpty()) {
            throw new IllegalArgumentException("Nome, cognome e codice fiscale non possono essere vuoti");
        }
        this.name = name;
        this.lastName = lastName;
        this.personID = personID;
    }

    public void setName(String name) {
        if (name == null || name.isEmpty()) {
            throw new IllegalArgumentException("Il nome non può essere vuoto");
        }
        this.name = name;
    }

    public void setLastName(String lastName) {
        if (lastName == null || lastName.isEmpty()) {
            throw new IllegalArgumentException("Il cognome non può essere vuoto");
        }
        this.lastName = lastName;
    }

    public void setPersonID(String personID) {
        if (personID == null || personID.isEmpty()) {
            throw new IllegalArgumentException("Il codice fiscale non può essere vuoto");
        }
        this.personID = personID;
    }

    public String getName() {
        return name;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPersonID() {
        return personID;
    }

    @Override
    public String toString() {
        return "Mi chiamo " + name + " " + lastName + " \nIl mio codice fiscale è: " + personID;
    }
}
