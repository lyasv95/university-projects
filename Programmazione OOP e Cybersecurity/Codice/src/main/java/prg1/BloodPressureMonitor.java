package prg1;

import java.io.Serial;
import java.io.Serializable;
import java.util.Random;

public class BloodPressureMonitor implements Serializable {
    @Serial
    private static final long serialVersionUID = 2L; //IDENTIFICATORE UNIVOCO DELLA VERSIONE DELLA CLASSE
    private Person person;
    private int bpm;

    private final Random randomBPM = new Random(); //OGGETTO RANDOM SOLO PER SIMULARE I BPM

    //VALIDAZIONE DEL COSTRUTTORE E DEL METODO SETTER
    public BloodPressureMonitor(Person person) {
        if (person == null) {
            throw new IllegalArgumentException("La persona non può essere null");
        }
        this.person = person;
        generateBPM();
    }

    public void setPerson(Person person) {
        if (person == null) {
            throw new IllegalArgumentException("La persona non può essere null");
        }
        this.person = person;
    }

    public Person getPerson() {
        return person;
    }

    public int getBPM() {
        return bpm;
    }


    public void generateBPM() { //GENERA UN BATTITO CARDIACO COMPRESO TRA 80 E 100
        this.bpm = 80 + randomBPM.nextInt(21);
    }
}
