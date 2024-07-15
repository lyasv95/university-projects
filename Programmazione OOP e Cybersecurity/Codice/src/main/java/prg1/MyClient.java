package prg1;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.*;
import java.net.Socket;
import java.util.Scanner;

public class MyClient {

    private static String serverName;
    private static int serverPort;

    public static void main(String[] args) {

        loadConfigurations();

        try (
                Socket socket = new Socket(serverName, serverPort);
                ObjectOutputStream out = new ObjectOutputStream(socket.getOutputStream());
                ObjectInputStream in = new ObjectInputStream(socket.getInputStream())
        ) {

            String username, password, otp;

            System.out.println("Benvenuto, è necessaria l'autenticazione per accedere al Servizio\nInserisci il tuo USERNAME: ");

            Scanner scanner = new Scanner(System.in);

            username = scanner.nextLine();

            System.out.println("Inserisci la tua PASSWORD: ");

            password = scanner.nextLine();

            System.out.println("Autenticazione in corso..");

            UserCredentials userCredentials = new UserCredentials(username, password);

            out.writeObject(userCredentials);

            String serverResponse = (String) in.readObject();

            System.out.println(serverResponse);

            if (!(serverResponse).equals("Credenziali Riconosciute")) { //PRIMA RICEZIONE DAL SERVER
                return;
            }

            System.out.println("Inserisci il tuo OTP: ");

            otp = scanner.nextLine();

            out.writeObject(otp); //SECONDO INVIO

            serverResponse = (String) in.readObject();

            System.out.println(serverResponse);

            if (!(serverResponse).equals("Autenticazione Concessa")) { //SECONDA RICEZIONE DAL SERVER
                return;
            }

            System.out.println("Trasmissione dei dati in corso ...");

            //TRASMISSIONE DATI - SIMULAZIONE SENSORE
            try {
                // PRIMO INVIO DATI
                Person p1 = new Person("Barba", "Gianni", "cfBarbaGianni2");
                BloodPressureMonitor bpMonitor1 = new BloodPressureMonitor(p1);
                out.writeUnshared(bpMonitor1);

                // GENERO NUOVO BPM ED INVIO DATI
                bpMonitor1.generateBPM();
                out.writeUnshared(bpMonitor1);

                //socket.close(); // DEBUG - TEST CHIUSURA CLIENT PRIMA DI INVIARE END

                //scanner.nextLine(); // DEBUG - TEST CRASH CLIENT

                // TERZO INVIO
                BloodPressureMonitor bpMonitor2 = new BloodPressureMonitor((new Person("Pinco", "Pallino", "cfPincoPallino2")));
                out.writeUnshared(bpMonitor2);
            } catch (IOException ex) {
                throw new RuntimeException("Errore durante la trasmissione dei dati al server", ex);
            } finally {
                out.writeObject("END"); //INVIO "END" PER COMUNICARE AL SERVER CHE NON SARANNO INVIATI ALTRI DATI
                System.out.println((String) in.readObject());
            }
        } catch (IOException ex) {
            throw new RuntimeException("Errore di I/O durante la comunicazione con il server", ex);
        } catch (ClassNotFoundException ex) {
            throw new RuntimeException("Errore durante la deserializzazione di un oggetto inviato dal server (classe non trovata)", ex);
        }
    }


    private static void loadConfigurations() {
        try (FileInputStream file = new FileInputStream("configClient.xml")){

            // PARSING DEL DOCUMENTO XML
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(file);

            //ESTRAZIONE DEI DATI DAL DOCUMENTO XML
            doc.getDocumentElement().normalize();
            Node serverNode = doc.getElementsByTagName("client").item(0);
            if (serverNode.getNodeType() == Node.ELEMENT_NODE) {
                Element serverElement = (Element) serverNode;
                serverName = serverElement.getElementsByTagName("serverName").item(0).getTextContent();
                serverPort = Integer.parseInt(serverElement.getElementsByTagName("serverPort").item(0).getTextContent());
            } else {
                throw new IllegalStateException("Il nodo 'client' nel file XML non è un elemento");
            }
        } catch (Exception ex) {
            throw new RuntimeException("Errore durante il caricamento del file di configurazione del Client", ex);
        }
    }
}





