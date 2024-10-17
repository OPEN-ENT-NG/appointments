package fr.openent.appointments.controller;

import fr.wseduc.rs.ApiDoc;
import fr.wseduc.rs.Get;
import fr.wseduc.rs.Post;
import fr.wseduc.rs.Put;
import fr.wseduc.rs.Delete;
import fr.wseduc.webutils.request.RequestUtils;
import fr.wseduc.security.ActionType;
import fr.wseduc.security.SecuredAction;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonObject;

import org.entcore.common.controller.ControllerHelper;
import org.entcore.common.http.filter.ResourceFilter;

import fr.openent.appointments.model.payload.GridPayload;
import fr.openent.appointments.service.GridService;
import fr.openent.appointments.service.ServiceFactory;
import fr.openent.appointments.service.impl.DefaultGridService;
import fr.openent.appointments.security.ManageRight;
import fr.openent.appointments.repository.impl.DefaultGridRepository;
import fr.openent.appointments.repository.RepositoryFactory;

public class GridController extends ControllerHelper {
    private final GridService gridService;

    public GridController(ServiceFactory serviceFactory) {
        this.gridService = serviceFactory.gridService();
    }

    @Get("/grids")
    @ApiDoc("Get my grids")
    public void getMyGrids(final HttpServerRequest request) {
        renderJson(request, new JsonObject());
    }

    @Get("/grids/:id")
    @ApiDoc("Get grid by id")
    public void getGridById(final HttpServerRequest request) {
        
        renderJson(request, new JsonObject());
    }

    @Get("/users/:id/grids")
    @ApiDoc("Get user grids")
    public void getUserGrids(final HttpServerRequest request) {
        
        renderJson(request, new JsonObject());
    }

    @Post("/grids")
    @ApiDoc("Create grid")
    @ResourceFilter(ManageRight.class)
    @SecuredAction(value = "", type = ActionType.RESOURCE)
    public void createGrid(final HttpServerRequest request) {
        RequestUtils.bodyToJson(request, body -> {
            if (body == null) {
                String message = "[Appointments@GridController:createGrid] Failed to parse request body to JSON";
                log.error(message);
                badRequest(request);
                return;
            }
            GridPayload grid = new GridPayload(body);
                log.info(grid.toString());
            if (!grid.isValid()) {
                String message = "[Appointments@GridController:createGrid] Invalid grid payload";
                log.error(message);
                badRequest(request);
                return;
            }
            gridService.createGrid(request, grid)
                .onSuccess(response -> {
                    renderJson(request, response);
                })
                .onFailure(error -> {
                    log.error("[Appointments@GridController:createGrid] Failed to create grid", error);
                    badRequest(request);
                });
        });
    }

    @Put("/grids/:id")
    @ApiDoc("Update grid")
    public void updateGrid(final HttpServerRequest request) {
        
        renderJson(request, new JsonObject());
    }

    @Delete("/grids/:id")
    @ApiDoc("Delete grid")
    public void deleteGrid(final HttpServerRequest request) {
        
        renderJson(request, new JsonObject());
    }
}
