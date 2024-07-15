package prg1;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import de.taimos.totp.TOTP;
import org.apache.commons.codec.binary.Base32;
import org.apache.commons.codec.binary.Hex;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;

public class TwoFactorAuthentication {

    public static String generateToken() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[20];
        random.nextBytes(bytes);
        Base32 base32 = new Base32();
        return base32.encodeToString(bytes);
    }

    public static String getTOTPCode(String token) {
        Base32 base32 = new Base32();
        byte[] bytes = base32.decode(token);
        String hexKey = Hex.encodeHexString(bytes); //CONVERSIONE IN UNA STRINGA ESADECIMALE
        return TOTP.getOTP(hexKey); //OTP BASATO SULL'ORA CORRENTE E SULLA CHIAVE SEGRETA
    }

    /*
    Genera un URL nel formato utilizzato da Google Authenticator
    per configurare un account di autenticazione a due fattori (2FA)
    utilizzando il protocollo TOTP (Time-based One-Time Password)
     */
    public static String getGoogleAuthenticatorBarCode(String token, String account, String issuer) {
        return "otpauth://totp/" //PROTOCOLLO DI AUTENTICAZIONE - TIPO PROTOCOLLO
                + URLEncoder.encode(issuer + ":" + account, StandardCharsets.UTF_8).replace("+", "%20") //URL_ENCODER DI JAVA CODIFICA GLI SPAZI CON "+" MA PER I CODICI QR è PREFERIBILE RAPPRESENTARE LO SPAZIO CON "%20"
                + "?secret=" + URLEncoder.encode(token, StandardCharsets.UTF_8).replace("+", "%20")
                + "&issuer=" + URLEncoder.encode(issuer, StandardCharsets.UTF_8).replace("+", "%20");
    }

    public static void createQRCode(String barCodeData, String filePath, int height, int width) {
        try {
            BitMatrix matrix = new MultiFormatWriter().encode(barCodeData, BarcodeFormat.QR_CODE, width, height); // CONVERSIONE VERSO UNA RAPPRESENTAZIONE ASTRATTA DEL QRCODE
            try (FileOutputStream out = new FileOutputStream(filePath)) {
                MatrixToImageWriter.writeToStream(matrix, "png", out);
            } catch (IOException ex) {
                throw new RuntimeException("Errore durante la scrittura del QR code", ex);
            }
        } catch (WriterException ex) {
            throw new RuntimeException("Errore durante la codifica del QR code", ex);
        }
    }

}


