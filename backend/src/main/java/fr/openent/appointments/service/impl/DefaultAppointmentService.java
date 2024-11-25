package fr.openent.appointments.service.impl;

import fr.openent.appointments.model.database.Appointment;
import fr.openent.appointments.repository.AppointmentRepository;
import fr.openent.appointments.repository.RepositoryFactory;
import fr.openent.appointments.service.AppointmentService;
import fr.openent.appointments.service.ServiceFactory;
import io.vertx.core.Future;

public class DefaultAppointmentService implements AppointmentService {
    private final AppointmentRepository appointmentRepository;

    public DefaultAppointmentService(ServiceFactory serviceFactory, RepositoryFactory repositoryFactory) {
        this.appointmentRepository = repositoryFactory.appointmentRepository();
    }

    @Override
    public Future<Appointment> create(String timeSlotId) {
        // TODO: Implement this method
        return Future.succeededFuture();
    }
}
