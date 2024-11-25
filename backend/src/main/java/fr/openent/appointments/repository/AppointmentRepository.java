package fr.openent.appointments.repository;

import fr.openent.appointments.model.database.Appointment;
import io.vertx.core.Future;

import java.util.Optional;

public interface AppointmentRepository {
    Future<Optional<Appointment>> create(String timeSlotId, String userId);
}
