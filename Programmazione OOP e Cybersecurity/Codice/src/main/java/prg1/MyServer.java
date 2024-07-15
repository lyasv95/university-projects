package prg1;

import javax.xml.parsers.DocumentBuilderFactory;
import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketException;
import java.util.logging.Level;
import javax.xml.parsers.DocumentBuilder;
import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.InfluxDBClientFactory;
import com.influxdb.client.WriteApiBlocking;
import com.influxdb.exceptions.InfluxException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

public class MyServer {
    private static MyLogger logger;
    private static int port;
    private static String influxDB_URL;
    private static String influxDB_Token;
    private static String organization;
    private static String bucket;
    private static String twoFactorAuthenticationToken;
    private static String logFileName;
    private static String credentialsFile;


    public static void main(String[] args) {

        loadConfigurations();

        logger = new MyLogger(MyServer.class);
        logger.setupLogger(logFileName);

        try (ServerSocket serverSocket = new ServerSocket(port)) {

            logger.getLogger().info("Server in ascolto sulla porta: " + port);

            System.out.println("Server in ascolto sulla porta: " + port); // DEBUG

            while (true) {
                Socket clientSocket = serverSocket.accept();
                System.out.println("Connessione stabilita con il client: " + clientSocket.getInetAddress().getHostAddress()); //DEBUG
                logger.getLogger().info("Connessione stabilita con il client: " + clientSocket.getInetAddress().getHostAddress());
                new ClientHandler(clientSocket).start();
            }
        } catch (IOException ex) {
            logger.getLogger().log(Level.SEVERE, "Errore nella creazione della socket del server", ex);
            throw new RuntimeException("Errore nella creazione della socket nel server", ex);
        } catch (Exception ex) {
            logger.getLogger().log(Level.SEVERE, "Errore generico nel server", ex);
            throw new RuntimeException("Errore generico nel server", ex);
        }
    }

    private static class ClientHandler extends Thread {
        private final Socket clientSocket;

        public ClientHandler(Socket socket) {
            this.clientSocket = socket;
        }

        public void run() {
            try (
                    ObjectOutputStream out = new ObjectOutputStream(clientSocket.getOutputStream());
                    ObjectInputStream in = new ObjectInputStream(clientSocket.getInputStream())
            ) {

                UserCredentials userCredentials = (UserCredentials) in.readObject();

                if (UserCredentials.authenticateUser(userCredentials, credentialsFile)) {

                    out.writeObject("Credenziali Riconosciute"); //PRIMO INVIO - ALTERNATIVA 1

                    String otp = (String) in.readObject(); //SECONDA RICEZIONE

                    if (otp.equals(TwoFactorAuthentication.getTOTPCode(twoFactorAuthenticationToken))) {

                        out.writeObject("Autenticazione Concessa"); //SECONDO INVIO - ALTERNATIVA 1

                        try (InfluxDBClient influxDBClient = InfluxDBClientFactory.create(influxDB_URL, influxDB_Token.toCharArray(), organization, bucket)) {

                            WriteApiBlocking writeApiBlocking = influxDBClient.getWriteApiBlocking();

                            Object receivedObject;

                            while (true) {
                                try {
                                    receivedObject = in.readObject();

                                    if (receivedObject instanceof BloodPressureMonitor) {
                                        BloodPressureMonitor bpMonitor = (BloodPressureMonitor) receivedObject;
                                        writeApiBlocking.writePoint(BPMPoint.createBPMPoint(bpMonitor));
                                        System.out.println("Punto scritto nel database"); //DEBUG
                                    }

                                    if (receivedObject instanceof String && receivedObject.equals("END")) { //CONTROLLO DEL SEGNALE DI FINE TRASMISSIONE
                                        out.writeObject("Ricezione dei dati conclusa - Connessione Terminata");
                                        break;
                                    }

                                } catch (EOFException ex) {
                                    logger.getLogger().log(Level.SEVERE, "Connessione interrotta prematuramente dal client", ex);
                                    out.writeObject("Ricezione dei dati interrotta - Connessione Terminata");
                                    break; // INTERROMPE IL CICLO PER EOF
                                } catch (SocketException ex) {
                                    logger.getLogger().log(Level.SEVERE, "Comunicazione interrotta improvvisamente dal client", ex); //Crash del client
                                    break;
                                }
                            }
                        } catch (InfluxException ex) {
                            logger.getLogger().log(Level.SEVERE, "Errore durante la comunicazione con InfluxDB", ex);
                            out.writeObject("Errore durante la comunicazione con il database - Connessione Terminata");
                        }
                    } else {
                        logger.getLogger().warning("L'utente " + userCredentials.getUsername() + " ha inserito un OTP errato");
                        out.writeObject("OTP Errato - Connessione Terminata"); //SECONDO INVIO - ALTERNATIVA 2
                    }
                } else {
                    logger.getLogger().warning("Il client: " + clientSocket.getInetAddress().getHostAddress() + " ha inserito credenziali errate");
                    out.writeObject("Credenziali Errate - Connessione Terminata"); //PRIMO INVIO - ALTERNATIVA 2
                }
            } catch (ClassNotFoundException ex) {
                logger.getLogger().log(Level.SEVERE, "Oggetto ricevuto non riconosciuto", ex);
            } catch (IOException ex) {
                logger.getLogger().log(Level.SEVERE, "Errore I/O nel server", ex);
            } catch (Exception ex) {
                logger.getLogger().log(Level.SEVERE, "Errore generico durante la gestione della richiesta del client", ex);
            } finally {
                try {
                    clientSocket.close();
                    System.out.println("Connessione chiusa"); //DEBUG
                } catch (IOException ex) {
                    logger.getLogger().log(Level.SEVERE, "Errore nella chiusura della socket nel server", ex);
                }
            }
        }
    }


    private static void loadConfigurations() {
        try (FileInputStream file = new FileInputStream("configServer.xml")){

            // PARSING DEL DOCUMENTO XML
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(file);

            //ESTRAZIONE DEI DATI DAL DOCUMENTO XML
            doc.getDocumentElement().normalize();
            Node serverNode = doc.getElementsByTagName("server").item(0);
            if (serverNode.getNodeType() == Node.ELEMENT_NODE) {
                Element serverElement = (Element) serverNode;
                port = Integer.parseInt(serverElement.getElementsByTagName("port").item(0).getTextContent());
                influxDB_URL = serverElement.getElementsByTagName("influxDB_URL").item(0).getTextContent();
                influxDB_Token = serverElement.getElementsByTagName("influxDB_Token").item(0).getTextContent();
                organization = serverElement.getElementsByTagName("organization").item(0).getTextContent();
                bucket = serverElement.getElementsByTagName("bucket").item(0).getTextContent();
                twoFactorAuthenticationToken = serverElement.getElementsByTagName("twoFactorAuthenticationToken").item(0).getTextContent();
                logFileName = serverElement.getElementsByTagName("logFileName").item(0).getTextContent();
                credentialsFile = serverElement.getElementsByTagName("credentialsFile").item(0).getTextContent();
            } else {
                throw new IllegalStateException("Il nodo 'client' nel file XML non è un elemento");
            }
        } catch (Exception ex) {
            throw new RuntimeException("Errore durante il caricamento del file di configurazione del Client", ex);
        }
    }
}














