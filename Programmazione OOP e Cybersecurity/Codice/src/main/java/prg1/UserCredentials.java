package prg1;

import org.mindrot.jbcrypt.BCrypt;

import java.io.*;

public class UserCredentials implements Serializable {
    private final String username, password;

    public UserCredentials(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    private String getPassword() {
        return password;
    }

    public void saveUser(String fileName) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName, true))) {
            writer.write(username + ":" + BCrypt.hashpw(password, BCrypt.gensalt()));
            writer.newLine();
        } catch (IOException ex) {
            throw new RuntimeException("Errore durante la scrittura delle credenziali", ex);
        }
    }



    // ECCEZIONI PROPAGATE AL CHIAMANTE (SERVER)
    public static boolean authenticateUser(UserCredentials userToCheck, String fileName) throws IOException {
        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(":");
                if (parts.length == 2) {
                    String username = parts[0];
                    String hashedPassword = parts[1];

                    if (username.equals(userToCheck.getUsername()) && BCrypt.checkpw(userToCheck.getPassword(), hashedPassword)) {
                        return true;
                    }
                } else {
                    throw new IOException("Contenuto del file non valido.");
                }
            }
        } catch (IOException ex) {
            throw new IOException("Non è stato possibile leggere il file delle credenziali", ex);
        }
        return false;
    }
}






