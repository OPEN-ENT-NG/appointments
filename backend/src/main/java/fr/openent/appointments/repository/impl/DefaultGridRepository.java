package fr.openent.appointments.repository.impl;

import fr.openent.appointments.core.constants.Fields;
import fr.openent.appointments.helper.IModelHelper;
import fr.openent.appointments.model.DailySlot;
import fr.openent.appointments.model.database.Grid;
import fr.openent.appointments.model.payload.GridPayload;
import fr.openent.appointments.model.TransactionElement;
import fr.openent.appointments.repository.GridRepository;
import fr.openent.appointments.enums.GridState;
import fr.openent.appointments.helper.DateHelper;
import fr.openent.appointments.helper.FutureHelper;
import fr.openent.appointments.helper.TransactionHelper;
import fr.openent.appointments.repository.RepositoryFactory;
import io.vertx.core.Future;
import io.vertx.core.Promise;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.entcore.common.sql.Sql;
import org.entcore.common.sql.SqlResult;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static fr.openent.appointments.enums.GridState.CLOSED;
import static fr.openent.appointments.core.constants.Constants.CAMEL_GRID_ID;
import static fr.openent.appointments.core.constants.Fields.*;
import static fr.openent.appointments.core.constants.SqlTables.*;

public class DefaultGridRepository implements GridRepository {

    private final Sql sql;

    public DefaultGridRepository(RepositoryFactory repositoryFactory) {
        this.sql = repositoryFactory.sql();
    }

    public Future<List<Grid>> getMyGrids(String userId, List<GridState> gridStates) {
        Promise<List<Grid>> promise = Promise.promise();

        String query = "SELECT * FROM " + DB_GRID_TABLE + " WHERE " + OWNER_ID + " = ? ";
        JsonArray params = new JsonArray().add(userId);

        // Filtering by states
        if (gridStates != null && !gridStates.isEmpty()) {
            query += " AND " + STATE + " IN " + Sql.listPrepared(gridStates);
            params.addAll(new JsonArray(gridStates.stream().map(GridState::getValue).collect(Collectors.toList())));
        }

        query += "ORDER BY " + CREATION_DATE + " DESC";

        String errorMessage = String.format("[Appointments@DefaultGridRepository::getMyGrids] Fail to get grids for userId %s : ", userId);
        sql.prepared(query, params, SqlResult.validResultHandler(IModelHelper.sqlResultToIModel(promise, Grid.class, errorMessage)));

        return promise.future();
    }

    public Future<JsonArray> getMyGridsByName(String userId, String gridName, List<GridState> gridStates) {
        Promise<JsonArray> promise = Promise.promise();

        StringBuilder queryBuilder = new StringBuilder("SELECT * FROM " + DB_GRID_TABLE + " WHERE " + OWNER_ID + " = ?");
        JsonArray params = new JsonArray().add(userId);

        if (gridName != null) {
            queryBuilder.append(" AND ").append(NAME).append(" = ?");
            params.add(gridName);
        }

        if (gridStates != null && !gridStates.isEmpty()) {
            queryBuilder.append(" AND ").append(STATE).append(" IN ")
                        .append(Sql.listPrepared(gridStates.toArray()));
            params.addAll(new JsonArray(gridStates.stream().map(GridState::getValue).collect(Collectors.toList())));
        }


        String query = queryBuilder.toString();
        String errorMessage = "[Appointments@DefaultGridRepository::getMyGridsByName] Fail to get grids : ";
        sql.prepared(query, params, SqlResult.validResultHandler(FutureHelper.handlerEither(promise, errorMessage)));

        return promise.future();
    }

    public Future<JsonArray> getGridsName (String userId) {
        Promise<JsonArray> promise = Promise.promise();

        String query = "SELECT " + NAME + " FROM " + DB_GRID_TABLE + " WHERE " + OWNER_ID + " = ? AND " + STATE + " IN (?, ?)";
        JsonArray params = new JsonArray()
                .add(userId)
                .add(GridState.OPEN.getValue())
                .add(GridState.SUSPENDED.getValue());

        String errorMessage = "[Appointments@DefaultGridRepository::getGridsName] Fail to get grids name : ";
        sql.prepared(query, params, SqlResult.validResultHandler(FutureHelper.handlerEither(promise, errorMessage)));

        return promise.future().map(jsonArray -> {
            JsonArray names = new JsonArray();
            jsonArray.forEach(grid -> names.add(((JsonObject) grid).getString(NAME)));
            return names;
        });
    }

    private Future<JsonObject> insert(GridPayload grid, String userId) {
        Promise<JsonObject> promise = Promise.promise();

        String query = "INSERT INTO "+ DB_GRID_TABLE +" (" +
            NAME + ", " +
            OWNER_ID + ", " +
            STRUCTURE_ID + ", " +
            BEGIN_DATE + ", " +
            END_DATE + ", " +
            CREATION_DATE + ", " +
            UPDATING_DATE + ", " +
            COLOR + ", " +
            DURATION + ", " +
            PERIODICITY + ", " +
            TARGET_PUBLIC_LIST_ID + ", " +
            VISIO_LINK + ", " +
            PLACE + ", " +
            DOCUMENT_ID + ", " +
            PUBLIC_COMMENT + ", " +
            STATE + ") " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id";

        String name = grid.getGridName();
        String ownerId = userId;
        String structureId = grid.getStructureId();
        String begin = DateHelper.formatDate(grid.getBeginDate());
        String end = DateHelper.formatDate(grid.getEndDate());
        String creation = "NOW()";
        String updating = "NOW()";
        String color = grid.getColor();
        String duration = DateHelper.formatDuration(grid.getDuration());
        Integer periodicity = grid.getPeriodicity().getValue();
        String targetPublicListId = grid.getTargetPublicIds().toString();
        String visioLink = grid.getVisioLink();
        String place = grid.getPlace();
        String documentId = grid.getDocumentId();
        String publicComment = grid.getPublicComment();
        String state = GridState.OPEN.getValue();

        JsonArray params = new JsonArray()
                .add(name)
                .add(ownerId)
                .add(structureId)
                .add(begin)
                .add(end)
                .add(creation)
                .add(updating)
                .add(color)
                .add(duration)
                .add(periodicity)
                .add(targetPublicListId)
                .add(visioLink)
                .add(place)
                .add(documentId)
                .add(publicComment)
                .add(state);

        String errorMessage = "[Appointments@DefaultGridRepository::insert] Fail to insert grid : ";
        sql.prepared(query, params, SqlResult.validUniqueResultHandler(FutureHelper.handlerEither(promise, errorMessage)));
        return promise.future();
    }

    private Future<JsonArray> insertDailySlots(Long gridId, List<DailySlot> dailySlots) {
        Promise<JsonArray> promise = Promise.promise();

        if (dailySlots == null || dailySlots.isEmpty()) {
            promise.complete(new JsonArray());
            return promise.future();
        }

        String query = "INSERT INTO " + DB_DAILY_SLOT_TABLE + " (" +
            DAY + ", " +
            BEGIN_TIME + ", " +
            END_TIME + ", " +
            GRID_ID + ") VALUES (?, ?, ?, ?)";

        List<TransactionElement> transactionElements = new ArrayList<>();

        dailySlots.forEach(dailySlot -> {
            JsonArray params = new JsonArray()
                    .add(dailySlot.getDay().toString())
                    .add(DateHelper.formatTime(dailySlot.getBeginTime()))
                    .add(DateHelper.formatTime(dailySlot.getEndTime()))
                    .add(gridId);

            transactionElements.add(new TransactionElement(query, params));
        });

        String errorMessage = "[Appointments@DefaultGridRepository::insertDailySlots] Fail to insert daily slot : ";
        TransactionHelper.executeTransactionAndGetJsonObjectResults(transactionElements, errorMessage)
            .onSuccess(promise::complete)
            .onFailure(promise::fail);
            
        return promise.future();
    }

    public Future<JsonObject> create(GridPayload grid, String userId) {
        return insert(grid, userId)
            .compose(insertedGridId -> {
                Long gridId = insertedGridId.getLong(Fields.ID, null);
                return insertDailySlots(gridId, grid.getDailySlots())
                    .map(inserted -> new JsonObject().put(CAMEL_GRID_ID, gridId));
            });
    }

    @Override
    public Future<JsonObject> closeAllPassedGrids() {
        Promise<JsonObject> promise = Promise.promise();
        
        String query = "UPDATE " + DB_GRID_TABLE + " SET " + STATE + " = ? WHERE " + END_DATE + " < ?;";
        JsonArray params = new JsonArray().add(CLOSED).add("NOW()");

        String errorMessage = "[Appointments@DefaultGridRepository::closeAllPassedGrids] Fail to close passed grids : ";
        sql.prepared(query, params, SqlResult.validUniqueResultHandler(FutureHelper.handlerEither(promise, errorMessage)));

        return promise.future();
    }
}
