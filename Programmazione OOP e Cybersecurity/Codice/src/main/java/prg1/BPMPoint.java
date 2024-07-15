package prg1;

import com.influxdb.client.domain.WritePrecision;
import com.influxdb.client.write.Point;

public class BPMPoint {
    public static Point createBPMPoint(BloodPressureMonitor bloodPressureMonitor){
        return Point.measurement("battito cardiaco")
                .addTag("codiceFiscale", bloodPressureMonitor.getPerson().getPersonID())
                .addField("bpm", bloodPressureMonitor.getBPM())
                .time(System.currentTimeMillis(), WritePrecision.MS);
    }
}
