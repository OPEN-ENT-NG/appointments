package fr.openent.appointments.enums;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum AppointmentFilterState {
    CREATED_REQUESTER("CREATED_REQUESTER"),
    CREATED_RECIPIENT("CREATED_RECIPIENT"),
    ACCEPTED("ACCEPTED"),
    REFUSED("REFUSED"),
    CANCELED("CANCELED");

    private final String value;

    AppointmentFilterState(String value) {
        this.value = value;
    }

    public static AppointmentFilterState getAppointmentFilterState(String value) {
        return Arrays.stream(AppointmentFilterState.values())
                .filter(appointmentFilterState -> appointmentFilterState.getValue().equals(value))
                .findFirst()
                .orElse(null);
    }
}
