package prg1;

import java.io.IOException;
import java.util.logging.*;

public class MyLogger {
    private final Logger logger;

    public <T> MyLogger(Class<T> tipoClasse) {
        this.logger = Logger.getLogger(tipoClasse.getName()); // ISTANZA DI LOGGER ASSOCIATA AL NOME DELLA CLASSE PASSATA COME PARAMETRO
    }

    public void setupLogger(String logFileName) {
        try {
            LogManager.getLogManager().reset(); // RIPRISTINO DELLA CONFIGURAZIONE PREDEFINITA
            logger.setLevel(Level.ALL); // IMPOSTAZIONE DEL LIVELLO DI LOGGING

            FileHandler fileHandler = new FileHandler(logFileName, true);
            fileHandler.setFormatter(new SimpleFormatter());

            logger.addHandler(fileHandler); //AGGIUNGE FILEHANDLER AL LOGGER
        } catch (IOException ex) {
            throw new RuntimeException("Impossibile configurare il logger", ex); //INTERROMPE L'AVVIO DEL SERVER SE IL LOGGER NON PUO' ESSERE CONFIGURATO
        }
    }

    public Logger getLogger() {
        return logger;
    }
}
