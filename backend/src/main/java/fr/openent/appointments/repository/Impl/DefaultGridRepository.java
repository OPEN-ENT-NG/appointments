package fr.openent.appointments.repository.impl;

import fr.openent.appointments.core.constants.Fields;
import fr.openent.appointments.core.constants.SqlTables;
import fr.openent.appointments.model.DailySlot;
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
import org.entcore.common.user.UserInfos;
import org.entcore.common.sql.Sql;
import org.entcore.common.sql.SqlResult;
import java.util.ArrayList;
import java.util.List;

public class DefaultGridRepository implements GridRepository {

    private final Sql sql;

    public DefaultGridRepository(RepositoryFactory repositoryFactory) {
        this.sql = repositoryFactory.sql();
    }

    private Future<JsonArray> checkIfGridExists(String gridName, String userId) {
        Promise<JsonArray> promise = Promise.promise();

        String checkQuery = "SELECT id FROM " + SqlTables.DB_GRID_TABLE + 
                            " WHERE " + Fields.NAME + " = ? " +
                            " AND " + Fields.OWNER_ID + " = ? " +
                            " AND " + Fields.STATE + " IN (?, ?)";

        JsonArray checkParams = new JsonArray()
                .add(gridName)
                .add(userId)
                .add(GridState.OPEN.getValue())
                .add(GridState.SUSPENDED.getValue());

        String errorMessage = "[Appointments@DefaultGridRepository::checkIfGridExists] Fail to check if grid exists : ";
        sql.prepared(checkQuery, checkParams, SqlResult.validResultHandler(FutureHelper.handlerEither(promise, errorMessage)));

        return promise.future();
    }

    private Future<JsonObject> insert(GridPayload grid, String userId) {
        Promise<JsonObject> promise = Promise.promise();

        String query = "INSERT INTO "+ SqlTables.DB_GRID_TABLE +" (" +
            Fields.NAME + ", " +
            Fields.OWNER_ID + ", " +
            Fields.STRUCTURE_ID + ", " +
            Fields.BEGIN_DATE + ", " +
            Fields.END_DATE + ", " +
            Fields.COLOR + ", " +
            Fields.DURATION + ", " +
            Fields.PERIODICITY + ", " +
            Fields.TARGET_PUBLIC_LIST_ID + ", " +
            Fields.VISIO_LINK + ", " +
            Fields.PLACE + ", " +
            Fields.DOCUMENT_ID + ", " +
            Fields.PUBLIC_COMMENT + ", " +
            Fields.STATE + ") " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id";

        String name = grid.getGridName();
        String ownerId = userId;
        String structureId = grid.getStructureId();
        String begin = DateHelper.formatDate(grid.getBeginDate());
        String end = DateHelper.formatDate(grid.getEndDate());
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

        String query = "INSERT INTO " + SqlTables.DB_DAILY_SLOT_TABLE + " (" +
            Fields.DAY + ", " +
            Fields.BEGIN_TIME + ", " +
            Fields.END_TIME + ", " +
            Fields.GRID_ID + ") VALUES (?, ?, ?, ?)";

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
        return checkIfGridExists(grid.getGridName(), userId)
            .compose(result -> {
                if (result.isEmpty()) {
                    String errorMessage = "[Appointments@DefaultGridRepository::create] Grid already exists";
                    return Future.failedFuture(errorMessage);
                }
                return insert(grid, userId)
                    .compose(insertedGridId -> {
                        Long gridId = insertedGridId.getLong("id");
                        return insertDailySlots(gridId, grid.getDailySlots())
                            .map(inserted -> new JsonObject().put("gridId", gridId));
                    });
        });
    }
}
