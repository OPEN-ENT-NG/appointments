package fr.openent.appointments.controller;

import fr.openent.appointments.helper.LogHelper;
import fr.openent.appointments.security.ViewRight;
import fr.openent.appointments.service.AppointmentService;
import fr.openent.appointments.service.ServiceFactory;
import fr.wseduc.rs.ApiDoc;
import fr.wseduc.rs.Post;
import fr.wseduc.security.ActionType;
import fr.wseduc.security.SecuredAction;
import io.vertx.core.http.HttpServerRequest;
import org.entcore.common.controller.ControllerHelper;
import org.entcore.common.http.filter.ResourceFilter;
import org.entcore.common.user.UserUtils;

import java.util.Optional;

import static fr.openent.appointments.core.constants.Constants.CAMEL_TIME_SLOT_ID;

public class AppointmentController extends ControllerHelper {
    private final AppointmentService appointmentService;

    public AppointmentController(ServiceFactory serviceFactory) {
        this.appointmentService = serviceFactory.appointmentService();
    }

    @Post("/appointments/:timeSlotId")
    @ApiDoc("Create an appointment linked to a time slot")
    @ResourceFilter(ViewRight.class)
    @SecuredAction(value="", type= ActionType.RESOURCE)
    public void createAppointment(final HttpServerRequest request) {
        Long timeSlotId = Optional.ofNullable(request.getParam(CAMEL_TIME_SLOT_ID))
                .map(Long::parseLong)
                .orElse(null);

        if (timeSlotId == null) {
            String errorMessage = "Missing time slot id";
            LogHelper.logError(this, "createAppointment", errorMessage);
            badRequest(request);
            return;
        }

        UserUtils.getAuthenticatedUserInfos(eb, request)
                .compose(user -> appointmentService.create(timeSlotId, user.getUserId(), user.getGroupsIds()))
                .onSuccess(appointment -> renderJson(request, appointment.toJson()))
                .onFailure(err -> {
                    String errorMessage = "Failed to create appointment";
                    LogHelper.logError(this, "createAppointment", errorMessage, err.getMessage());
                    conflict(request);
                });
    }
}