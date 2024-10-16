package fr.openent.appointments.enums;

public enum Periodicity {
    WEEKLY(1),
    FORTNIGHTLY(2);

    private final Integer value;

    Periodicity(Integer value) {
        this.value = value;
    }

    public Integer getValue() {
        return value;
    }

    public static Periodicity from(Integer value) {
        for (Periodicity type : values()) {
            if (type.value.equals(value)) {
                return type;
            }
        }
        return null;
    }
}
