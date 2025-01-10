package fr.openent.appointments.service;

import fr.openent.appointments.enums.AppointmentState;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import org.entcore.common.user.UserInfos;

public interface NotifyService {

    /**
     * Notify new appointment
     *
     * @param request         Http server request
     * @param requesterUser   Requester user
     * @param targetUserId    Target user id
     */
    void notifyNewAppointment(HttpServerRequest request, UserInfos requesterUser, String targetUserId);

    /**
     * Notify appointment update
     *
     * @param request         Http server request
     * @param actionUserInfos Action user infos
     * @param prevState       Previous appointment state
     * @param appointmentId   Appointment id
     */
    void notifyAppointmentUpdate(HttpServerRequest request, UserInfos actionUserInfos, AppointmentState prevState, Long appointmentId);
}
