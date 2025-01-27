package fr.openent.appointments.controller;

import fr.openent.appointments.enums.GridState;
import fr.openent.appointments.helper.IModelHelper;
import fr.openent.appointments.helper.LogHelper;
import fr.openent.appointments.helper.ParamHelper;
import fr.wseduc.rs.ApiDoc;
import fr.wseduc.rs.Get;
import fr.wseduc.rs.Post;
import fr.wseduc.rs.Put;
import fr.wseduc.rs.Delete;
import fr.wseduc.webutils.request.RequestUtils;
import fr.wseduc.security.ActionType;
import fr.wseduc.security.SecuredAction;

import io.vertx.core.Future;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;

import org.entcore.common.controller.ControllerHelper;
import org.entcore.common.http.filter.ResourceFilter;

import fr.openent.appointments.model.payload.GridPayload;
import fr.openent.appointments.service.GridService;
import fr.openent.appointments.service.ServiceFactory;
import fr.openent.appointments.security.ManageRight;
import fr.openent.appointments.security.ViewRight;
import org.entcore.common.user.UserUtils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static fr.openent.appointments.core.constants.Constants.*;
import static fr.openent.appointments.core.constants.Fields.OWNER_ID;

public class GridController extends ControllerHelper {
    private final GridService gridService;

    public GridController(ServiceFactory serviceFactory) {
        this.gridService = serviceFactory.gridService();
    }

    @Get("/grids")
    @ApiDoc("Get my grids")
    @SecuredAction(value = "", type = ActionType.RESOURCE)
    @ResourceFilter(ManageRight.class)
    public void getMyGrids(final HttpServerRequest request) {
        Long page = ParamHelper.getParam(PAGE, request, Long.class, false, "getMyGrids");
        if (request.response().ended()) return;

        Long limit = ParamHelper.getParam(LIMIT, request, Long.class, false, "getMyGrids");
        if (request.response().ended()) return;

        List<GridState> states = new JsonArray(request.params().get(STATES)).stream()
                .filter(String.class::isInstance)
                .map(String.class::cast)
                .map(GridState::getGridState)
                .collect(Collectors.toList());

        UserUtils.getAuthenticatedUserInfos(eb, request)
            .compose(user -> gridService.getMyMinimalGrids(user.getUserId(), states, page, limit))
            .onSuccess(listGridsResponse -> renderJson(request, listGridsResponse.toJson()))
            .onFailure(error -> {
                String errorMessage = "Failed to get my grids";
                LogHelper.logError(this, "getMyGrids", errorMessage, error.getMessage());
                renderError(request);
            });
    }

    @Get("/grids/names")
    @ApiDoc("Get my grids name")
    @ResourceFilter(ManageRight.class)
    @SecuredAction(value = "", type = ActionType.RESOURCE)
    public void getMyGridsName(final HttpServerRequest request) {
        UserUtils.getAuthenticatedUserInfos(eb, request)
            .compose(user -> gridService.getGridsName(user.getUserId()))
            .onSuccess(response -> renderJson(request, response))
            .onFailure(error -> {
                String errorMessage = String.format("[Appointments@%s::getMyGridsName] Failed to get my grids name : %s", this.getClass().getSimpleName(), error.getMessage());
                log.error(errorMessage);
                badRequest(request);
            });
    }

    @Get("/grids/:gridId")
    @ApiDoc("Get grid by id")
    @ResourceFilter(ViewRight.class)
    @SecuredAction(value = "", type = ActionType.RESOURCE)
    public void getGridById(final HttpServerRequest request) {

        renderJson(request, new JsonObject());
    }

    @Get("/grids/:gridId/minimal/infos")
    @ApiDoc("Get minimal grid infos by grid id")
    @ResourceFilter(ViewRight.class)
    @SecuredAction(value = "", type = ActionType.RESOURCE)
    public void getMinimalGridInfosById(final HttpServerRequest request) {
        Long gridId = ParamHelper.getParam(CAMEL_GRID_ID, request, Long.class, true, "getMinimalGridInfosById");
        if (request.response().ended()) return;

        UserUtils.getAuthenticatedUserInfos(eb, request)
            .compose(user -> gridService.getMinimalGridInfosById(user, gridId))
            .onSuccess(minimalGridsInfos -> renderJson(request, minimalGridsInfos.toJson()))
            .onFailure(err -> {
                String errorMessage = "Failed to get minimal grids infos for grid with id " + gridId;
                LogHelper.logError(this, "getMinimalGridInfosById", errorMessage, err.getMessage());
                badRequest(request);
            });
    }

    @Get("/users/:userId/grids/minimal")
    @ApiDoc("Get user grids")
    @ResourceFilter(ViewRight.class)
    @SecuredAction(value = "", type = ActionType.RESOURCE)
    public void getAvailableUserMinimalGrids(final HttpServerRequest request) {
        String userId = ParamHelper.getParam(CAMEL_USER_ID, request, String.class, true, "getAvailableUserMinimalGrids");
        if (request.response().ended()) return;

        UserUtils.getAuthenticatedUserInfos(eb, request)
            .compose(user -> gridService.getAvailableUserMinimalGrids(user, userId))
            .onSuccess(minimalGrids -> renderJson(request, IModelHelper.toJsonArray(minimalGrids)))
            .onFailure(err -> {
                String errorMessage = "Failed to get available grids for user with id " + userId;
                LogHelper.logError(this, "getAvailableUserMinimalGrids", errorMessage, err.getMessage());
                badRequest(request);
            });
    }

    @Post("/grids")
    @ApiDoc("Create grid")
    @ResourceFilter(ManageRight.class)
    @SecuredAction(value = "", type = ActionType.RESOURCE)
    public void createGrid(final HttpServerRequest request) {
        RequestUtils.bodyToJson(request, body -> {
            GridPayload gridPayload = new GridPayload(body);
            if (!gridPayload.isValid()) {
                String errorMessage = "Invalid grid payload";
                LogHelper.logError(this, "createGrid", errorMessage, gridPayload.toString());
                badRequest(request);
                return;
            }

            gridPayload.buildTimeSlots();
            gridService.createGrid(request, gridPayload)
                .onSuccess(grid -> renderJson(request, grid.toJson()))
                .onFailure(err -> {
                    String errorMessage = "Failed to create grid";
                    LogHelper.logError(this, "createGrid", errorMessage, err.getMessage());
                    badRequest(request);
                });
        });
    }

    @Put("/grids/:gridId")
    @ApiDoc("Update grid")
    @ResourceFilter(ManageRight.class)
    @SecuredAction(value = "", type = ActionType.RESOURCE)
    public void updateGrid(final HttpServerRequest request) {
        Long gridId = ParamHelper.getParam(CAMEL_GRID_ID, request, Long.class, true, "updateGrid");
        if (request.response().ended()) return;

        JsonObject composeInfos = new JsonObject();
        RequestUtils.bodyToJson(request, body -> {
            GridPayload gridPayload = new GridPayload(body);
            gridService.getGridById(gridId)
                .compose(grid -> {
                    composeInfos.put(OWNER_ID, grid.getOwnerId());
                    return UserUtils.getAuthenticatedUserInfos(eb, request);
                })
                .recover(error -> {
                    String errorMessage = "Failed to get grid with id " + gridId;
                    LogHelper.logError(this, "updateGrid", errorMessage, error.getMessage());
                    conflict(request, errorMessage);
                    return Future.failedFuture(errorMessage);
                })
                .compose(user -> {
                    if (!composeInfos.getString(OWNER_ID).equals(user.getUserId())) {
                        String errorMessage = "You are not the owner of this grid";
                        LogHelper.logError(this, "updateGrid", errorMessage);
                        unauthorized(request, errorMessage);
                        return Future.failedFuture(errorMessage);
                    }
                    return gridService.updateGrid(gridId, gridPayload);
                })
                .onSuccess(
                    grid -> renderJson(request, grid.toJson())
                )
                .onFailure(error -> {
                    String errorMessage = "Failed to update grid with id " + gridId;
                    LogHelper.logError(this, "updateGrid", errorMessage, error.getMessage());
                    if (!request.response().ended()) renderError(request);
                });
        });
    }

    @Put("/grids/:gridId/delete")
    @ApiDoc("Delete grid with the possibility to delete all appointments associated")
    @ResourceFilter(ManageRight.class)
    @SecuredAction(value = "", type = ActionType.RESOURCE)
    public void deleteGrid(final HttpServerRequest request) {
        Long gridId = ParamHelper.getParam(CAMEL_GRID_ID, request, Long.class, true, "deleteGrid");
        if (request.response().ended()) return;

        boolean deleteAppointments = Boolean.TRUE.equals(ParamHelper.getParam(CAMEL_DELETE_APPOINTMENTS, request, Boolean.class, false, "deleteGrid"));
        if (request.response().ended()) return;

        JsonObject composeInfos = new JsonObject();
        gridService.getGridById(gridId)
            .compose(grid -> {
                composeInfos.put(OWNER_ID, grid.getOwnerId());
                return UserUtils.getAuthenticatedUserInfos(eb, request);
            })
            .recover(error -> {
                String errorMessage = "Failed to get grid with id " + gridId;
                LogHelper.logError(this, "deleteGrid", errorMessage, error.getMessage());
                conflict(request, errorMessage);
                return Future.failedFuture(errorMessage);
            })
            .compose(user -> {
                if (!composeInfos.getString(OWNER_ID).equals(user.getUserId())) {
                    String errorMessage = "You are not the owner of this grid";
                    LogHelper.logError(this, "deleteGrid", errorMessage);
                    unauthorized(request, errorMessage);
                    return Future.failedFuture(errorMessage);
                }
                return gridService.deleteGrid(gridId, deleteAppointments);
            })
            .onSuccess(requesterIds -> renderJson(request, new JsonObject()))
            .onFailure(error -> {
                String errorMessage = "Failed to delete grid with id " + gridId;
                LogHelper.logError(this, "deleteGrid", errorMessage, error.getMessage());
                if (!request.response().ended()) renderError(request);
            });


        renderJson(request, new JsonObject());
    }
}
