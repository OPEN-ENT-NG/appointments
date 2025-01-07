package fr.openent.appointments.service;

import fr.openent.appointments.enums.AppointmentState;
import fr.openent.appointments.model.database.Appointment;
import fr.openent.appointments.model.database.AppointmentWithInfos;
import fr.openent.appointments.model.response.DateListResponse;
import fr.openent.appointments.model.response.ListAppointmentsResponse;
import io.vertx.core.Future;
import org.entcore.common.user.UserInfos;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentService {

    /**
     *
     * @param timeSlotId The time slot id
     * @param userId The user id
     * @param userGroupsIds The user groups ids
     * @return if the user can access the time slot
     */
    public Future<Boolean> checkIfUserCanAccessTimeSlot(Long timeSlotId, String userId, List<String> userGroupsIds);


    /**
     *
     * @param timeSlotId The time slot id
     * @return if the time slot is available
     */
    public Future<Boolean> checkIfTimeSlotIsAvailable(Long timeSlotId);

    /**
     *  Create an appointment linked to a time slot
     *
     *  @param timeSlotId The time slot id
     *  @param userId The user id
     *  @param isVideoCall The user choice for video call
     *  @return The created appointment
     */
    Future<Appointment> create(Long timeSlotId, String userId, Boolean isVideoCall);

    /**
     * Get appointments of a user
     * @param userInfos The user infos
     * @param states The states of the appointments
     * @param page The page number
     * @param limit The limit of the number of appointments
     * @return The list of appointments
     */
    Future<ListAppointmentsResponse> getMyAppointments(UserInfos userInfos, List<AppointmentState> states, Long page, Long limit);

    /**
     * Get dates of appointments with a specific state of a user
     * @param userId The user id
     * @param states The states of the appointments
     */
    Future<DateListResponse> getAppointmentsDates(String userId, List<AppointmentState> states);

    /**
     * Get appointment by its id
     * @param appointmentId The appointment id
     * @param userId The user id
     * @return The appointment
     */
    Future<AppointmentWithInfos> getAppointmentById(Long appointmentId, String userId);

    /**
     * Accept an appointment
     * @param appointmentId The appointment id
     * @param userId The user id
     * @return The updated appointment
     */
    Future<Appointment> acceptAppointment(Long appointmentId, String userId);

    /**
     * reject an appointment
     * @param appointmentId The appointment id
     * @param userId The user id
     * @return The updated appointment
     */
    Future<Appointment> rejectAppointment(Long appointmentId, String userId);

    /**
     * Cancel an appointment
     * @param appointmentId The appointment id
     * @param userId The user id
     * @return The updated appointment
     */
    Future<Appointment> cancelAppointment(Long appointmentId, String userId);
}
