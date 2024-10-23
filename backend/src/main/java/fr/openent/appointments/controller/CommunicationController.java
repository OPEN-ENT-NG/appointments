package fr.openent.appointments.controller;

import fr.openent.appointments.service.CommunicationService;
import fr.openent.appointments.service.ServiceFactory;
import fr.wseduc.rs.ApiDoc;
import fr.wseduc.rs.Get;
import fr.wseduc.security.SecuredAction;
import fr.wseduc.security.ActionType;
import fr.wseduc.webutils.http.BaseController;
import org.entcore.common.http.filter.ResourceFilter;
import io.vertx.core.http.HttpServerRequest;
import fr.openent.appointments.security.ManageRight;
import org.entcore.common.user.UserUtils;


public class CommunicationController extends BaseController {
    private final CommunicationService communicationService;

    public CommunicationController(ServiceFactory serviceFactory) {
        this.communicationService = serviceFactory.communicationService();
    }

    @Get("/communication/groups")
    @ApiDoc("Get groups that can communicate with me")
    @ResourceFilter(ManageRight.class)
    @SecuredAction(value = "", type = ActionType.RESOURCE)
    public void getVisibleGroups(final HttpServerRequest request) {
        UserUtils.getUserInfos(eb, request, user -> {
            if (user != null) {
                communicationService.getVisibleGroups(user.getUserId())
                    .onSuccess(groups -> renderJson(request, groups))
                    .onFailure(error -> {
                        String errorMessage = "Appointments@CommunicationController::getVisibleGroups" + error.getMessage();
                        log.error(errorMessage);
                        renderError(request);
                    });
            } else {
                renderError(request);
            }
        });
    }
}
