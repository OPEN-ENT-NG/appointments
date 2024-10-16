package fr.openent.appointments.enums;

public enum Day {
    MONDAY("MONDAY"),
    TUESDAY("TUESDAY"),
    WEDNESDAY("WEDNESDAY"),
    THURSDAY("THURSDAY"),
    FRIDAY("FRIDAY"),
    SATURDAY("SATURDAY"),
    SUNDAY("SUNDAY");

    private final String value;

    Day(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static Day from(String value) {
        for (Day type : values()) {
            if (type.value.equals(value)) {
                return type;
            }
        }
        return null;
    }
}
