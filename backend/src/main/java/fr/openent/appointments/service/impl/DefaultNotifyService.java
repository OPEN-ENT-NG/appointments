package fr.openent.appointments.service.impl;

import fr.openent.appointments.enums.AppointmentState;
import fr.openent.appointments.helper.LogHelper;
import fr.openent.appointments.model.database.AppointmentWithInfos;
import fr.openent.appointments.repository.AppointmentRepository;
import fr.openent.appointments.repository.RepositoryFactory;
import fr.openent.appointments.service.NotifyService;
import fr.openent.appointments.service.ServiceFactory;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonObject;
import org.entcore.common.notification.TimelineHelper;
import org.entcore.common.user.UserInfos;

import java.util.Collections;
import java.util.List;

import static fr.openent.appointments.core.constants.Constants.*;
import static fr.openent.appointments.core.constants.Notif.*;

public class DefaultNotifyService implements NotifyService {
    private final TimelineHelper timelineHelper;
    private final AppointmentRepository appointmentRepository;

    public DefaultNotifyService(ServiceFactory serviceFactory, RepositoryFactory repositoryFactory) {
        this.timelineHelper = serviceFactory.timelineHelper();
        this.appointmentRepository = repositoryFactory.appointmentRepository();
    }

    @Override
    public void notifyNewAppointment(HttpServerRequest request, UserInfos requesterUser, String targetUserId){
        JsonObject params = new JsonObject()
            .put(CAMEL_USER_NAME, requesterUser.getUsername())
            .put(CAMEL_USER_URI, USERBOOK_ANNUAIRE_URI + requesterUser.getUserId())
            .put(CAMEL_APPOINTMENT_URI, APPOINTMENTS_URI)
            .put(CAMEL_PUSH_NOTIF, new JsonObject().put(TITLE, NOTIF_NAME_NEW_APPOINTMENT).put(BODY, ""));

        List<String> targetUsers = Collections.singletonList(targetUserId);

        timelineHelper.notifyTimeline(request, NOTIF_NAME_NEW_APPOINTMENT, requesterUser, targetUsers, params);
    }

    private String getNotifName(AppointmentState prevState, AppointmentState newState){
        switch (prevState){
            case CREATED:
                if(newState == AppointmentState.ACCEPTED) return NOTIF_NAME_ACCEPT_REQUEST;
                if(newState == AppointmentState.REFUSED) return NOTIF_NAME_REJECT_REQUEST;
                if(newState == AppointmentState.CANCELED) return NOTIF_NAME_CANCEL_REQUEST;
            case ACCEPTED:
                if(newState == AppointmentState.CANCELED) return NOTIF_NAME_CANCEL_APPOINTMENT;
            default:
                return null;
        }
    }


    @Override
    public void notifyAppointmentUpdate(HttpServerRequest request, UserInfos actionUserInfos, AppointmentState prevState, Long appointmentId){

        appointmentRepository.get(appointmentId)
            .onSuccess(appointmentWithInfos -> {
                if (!appointmentWithInfos.isPresent()) {
                    String errorMessage = "Appointment with id " + appointmentId + " not found";
                    LogHelper.logError(this, "notifyAppointmentUpdate", errorMessage);
                    return;
                }
                AppointmentWithInfos appointment = appointmentWithInfos.get();

                String notifName = getNotifName(prevState, appointment.getState());
                if(notifName == null) {
                    String errorMessage = "Notif not allowed for action : from state " + prevState + " to state " + appointment.getState();
                    LogHelper.logError(this, "notifyAppointmentUpdate", errorMessage);
                    return;
                }

                String requesterUserId = appointment.getRequesterId();
                String ownerUserId = appointment.getOwnerId();
                String otherUserId = requesterUserId.equals(actionUserInfos.getUserId()) ? ownerUserId : requesterUserId;

                JsonObject params = new JsonObject()
                    .put(CAMEL_USER_NAME, actionUserInfos.getUsername())
                    .put(CAMEL_USER_URI, USERBOOK_ANNUAIRE_URI + actionUserInfos.getUserId())
                    .put(CAMEL_APPOINTMENT_URI, APPOINTMENTS_URI+"#/?appointmentId="+appointmentId)
                    .put(CAMEL_PUSH_NOTIF, new JsonObject().put(TITLE, notifName).put(BODY, ""));

                List<String> targetUsers = Collections.singletonList(otherUserId);

                timelineHelper.notifyTimeline(request, notifName, actionUserInfos, targetUsers, params);

                LogHelper.logInfo(this, "notifyAppointmentUpdate", "Notif sent : " + notifName + " to " + otherUserId);
            })
            .onFailure(err -> {
                String errorMessage = "Error while getting appointment with id " + appointmentId;
                LogHelper.logError(this, "notifyAppointmentUpdate", errorMessage, err.getMessage());
            });
    }
}
