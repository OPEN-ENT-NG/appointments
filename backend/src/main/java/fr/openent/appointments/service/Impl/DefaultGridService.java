package fr.openent.appointments.service.impl;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.Future;
import io.vertx.core.Promise;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.core.eventbus.EventBus;
import fr.openent.appointments.model.payload.GridPayload;
import fr.openent.appointments.repository.GridRepository;
import fr.openent.appointments.repository.impl.DefaultGridRepository;
import fr.openent.appointments.repository.RepositoryFactory;
import fr.openent.appointments.service.GridService;
import fr.openent.appointments.service.ServiceFactory;

import org.entcore.common.user.UserUtils;

/**
 * Default implementation of the GridService interface.
 */
public class DefaultGridService implements GridService {

    private final EventBus eb;
    private final GridRepository gridRepository;

    public DefaultGridService(ServiceFactory serviceFactory, RepositoryFactory repositoryFactory) {
        this.eb = serviceFactory.eventBus();
        this.gridRepository = repositoryFactory.gridRepository();
    }

    @Override
    public Future<JsonArray> getMyGrids() {
        // TODO: Implement the logic to retrieve all grids associated with the current user.
        return Future.succeededFuture(new JsonArray());
    }

    @Override
    public Future<JsonArray> getGridById(Integer gridId) {
        // TODO: Implement the logic to retrieve a specific grid by its ID.
        return Future.succeededFuture(new JsonArray());
    }

    @Override
    public Future<JsonArray> getUserGrids(Integer userId) {
        // TODO: Implement the logic to retrieve all grids associated with a specific user.
        return Future.succeededFuture(new JsonArray());
    }

    @Override
    public Future<JsonObject> createGrid(HttpServerRequest request, GridPayload grid) {
        Promise<JsonObject> promise = Promise.promise();

        UserUtils.getAuthenticatedUserInfos(eb, request)
            .compose(user -> {
                return gridRepository.create(grid, user.getUserId());
            })
            .onSuccess(gridId -> {
                promise.complete(new JsonObject().put("gridId", gridId));
            })
            .onFailure(err -> {
                promise.fail(err);
            });

        return promise.future();
    }

    @Override
    public Future<Void> updateGrid(Integer gridId, JsonArray grid) {
        // TODO: Implement the logic to update an existing grid.
        return Future.succeededFuture();
    }

    @Override
    public Future<Void> suspendGrid(Integer gridId) {
        // TODO: Implement the logic to suspend a specific grid.
        return Future.succeededFuture();
    }

    @Override
    public Future<Void> restoreGrid(Integer gridId) {
        // TODO: Implement the logic to restore a suspended grid.
        return Future.succeededFuture();
    }

    @Override
    public Future<Void> deleteGrid(Integer gridId) {
        // TODO: Implement the logic to delete a specific grid.
        return Future.succeededFuture();
    }
}
