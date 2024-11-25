package fr.openent.appointments.service.impl;

import fr.openent.appointments.model.database.Appointment;
import fr.openent.appointments.repository.AppointmentRepository;
import fr.openent.appointments.repository.RepositoryFactory;
import fr.openent.appointments.service.AppointmentService;
import fr.openent.appointments.service.ServiceFactory;
import fr.openent.appointments.service.TimeSlotService;
import io.vertx.core.Future;

import java.util.List;

public class DefaultAppointmentService implements AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final TimeSlotService timeSlotService;

    public DefaultAppointmentService(ServiceFactory serviceFactory, RepositoryFactory repositoryFactory) {
        this.appointmentRepository = repositoryFactory.appointmentRepository();
        this.timeSlotService = serviceFactory.timeSlotService();
    }

    @Override
    public Future<Appointment> create(Long timeSlotId, String userId, List<String> userGroupsIds) {
        timeSlotService.checkIfUserCanAccessTimeSlot(timeSlotId, userId, userGroupsIds)
            .compose(isAuthorized -> {
                if (!isAuthorized) {
                    return Future.failedFuture("User is not authorized to access this time slot");
                }
                return appointmentRepository.create(timeSlotId, userId);
            });
    }
}
