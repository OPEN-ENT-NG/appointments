package fr.openent.appointments.controller;

import fr.openent.appointments.core.constants.WorkflowRight;
import fr.wseduc.rs.ApiDoc;
import fr.wseduc.rs.Get;
import fr.wseduc.security.ActionType;
import fr.wseduc.security.SecuredAction;
import fr.wseduc.webutils.http.Renders;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonObject;

import org.entcore.common.controller.ControllerHelper;
import org.entcore.common.http.filter.ResourceFilter;
import org.entcore.common.http.filter.SuperAdminFilter;

public class MainController extends ControllerHelper {

    public MainController() {
        super();
    }

    @Get("")
    @ApiDoc("Render home view")
    @SecuredAction(WorkflowRight.VIEW)
    public void view(HttpServerRequest request) {
        renderView(request, new JsonObject(), "index.html", null);
    }

    @Get("/config")
    @SecuredAction(value = "", type = ActionType.RESOURCE)
    @ResourceFilter(SuperAdminFilter.class)
    public void getConfig(final HttpServerRequest request) {
        renderJson(request, config);
    }

    @SecuredAction(WorkflowRight.MANAGE)
    public void initManageRights(final HttpServerRequest request) {
    }
}
