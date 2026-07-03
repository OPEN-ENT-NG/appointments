package fr.openent.appointments.controller;

import fr.openent.appointments.enums.AppointmentFilterState;
import fr.openent.appointments.helper.IModelHelper;
import fr.openent.appointments.helper.LogHelper;
import fr.openent.appointments.security.ViewRight;
import fr.openent.appointments.service.AppointmentService;
import fr.openent.appointments.service.ServiceFactory;
import fr.wseduc.rs.ApiDoc;
import fr.wseduc.rs.Get;
import fr.wseduc.security.ActionType;
import fr.wseduc.security.SecuredAction;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import org.entcore.common.controller.ControllerHelper;
import org.entcore.common.http.filter.ResourceFilter;
import org.entcore.common.user.UserUtils;

import java.util.stream.Collectors;

public class FilterController extends ControllerHelper {
    private final AppointmentService appointmentService;

    public FilterController(ServiceFactory serviceFactory) {
        this.appointmentService = serviceFactory.appointmentService();
    }

    @Get("/filters/appointments/states")
    @ApiDoc("Get the appointment states present in the current user's appointments")
    @ResourceFilter(ViewRight.class)
    @SecuredAction(value = "", type = ActionType.RESOURCE)
    public void getAppointmentStates(final HttpServerRequest request) {
        UserUtils.getAuthenticatedUserInfos(eb, request)
            .compose(user -> appointmentService.getMyAppointmentStates(user.getUserId()))
            .onSuccess(states -> renderJson(request, new JsonArray(
                    states.stream().map(AppointmentFilterState::getValue).collect(Collectors.toList())
            )))
            .onFailure(err -> {
                String errorMessage = "Failed to get appointment states";
                LogHelper.logError(this, "getAppointmentStates", errorMessage, err.getMessage());
                renderError(request);
            });
    }

    @Get("/filters/appointments/grids")
    @ApiDoc("Get the grids referenced by the current user's appointments")
    @ResourceFilter(ViewRight.class)
    @SecuredAction(value = "", type = ActionType.RESOURCE)
    public void getAppointmentGrids(final HttpServerRequest request) {
        UserUtils.getAuthenticatedUserInfos(eb, request)
            .compose(user -> appointmentService.getMyAppointmentGrids(user.getUserId()))
            .onSuccess(grids -> renderJson(request, IModelHelper.toJsonArray(grids)))
            .onFailure(err -> {
                String errorMessage = "Failed to get appointment grids";
                LogHelper.logError(this, "getAppointmentGrids", errorMessage, err.getMessage());
                renderError(request);
            });
    }
}
