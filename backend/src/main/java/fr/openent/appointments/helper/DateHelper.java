package fr.openent.appointments.helper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.time.Duration;

public class DateHelper {
    private static final String DATE_FORMAT = "yyyy-MM-dd";
    private static final String DURATION_FORMAT = "HH:mm";

    public static Date parseDate(String date) {
        SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
        try {
            return sdf.parse(date);
        } catch (ParseException e) {
            return null;
        }
    }

    public static String formatDate(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
        return sdf.format(date);
    }

    public static Duration parseDuration(String duration) {
        if (duration == null) {
            return null;
        }
        String[] parts = duration.split(":");
        if (parts.length != 2) {
            return null;
        }
        try {
            long hours = Long.parseLong(parts[0]);
            long minutes = Long.parseLong(parts[1]);
            return Duration.ofHours(hours).plusMinutes(minutes);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    public static String formatDuration(Duration duration) {
        if (duration == null) {
            return null;
        }
        long hours = duration.toHours();
        long minutes = duration.minusHours(hours).toMinutes();
        return String.format("%02d:%02d", hours, minutes);
    }
}
