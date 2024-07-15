package prg1;

import com.influxdb.client.InfluxDBClient;

import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        UserCredentials u1 = new UserCredentials("pinco", "pallino");
        u1.saveUser("credentials.txt");





    }
}
