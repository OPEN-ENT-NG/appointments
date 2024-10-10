package fr.openent.appointments.repository.Impl;

import fr.openent.appointments.model.grid.PayloadGrid;
import fr.openent.appointments.repository.GridRepository;
import fr.openent.appointments.enums.GridState;
import fr.openent.appointments.helper.DateHelper;
import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;
import org.entcore.common.user.UserInfos;
import io.vertx.core.json.JsonArray;

import fr.wseduc.webutils.Either;

public class DefaultGridRepository implements GridRepository {

    public void create(PayloadGrid payloadGrid, UserInfos user, Handler<Either<String, JsonObject>> handler) {
        String query = "INSERT INTO appointments.grid (name, owner_id, structure_id, begin, end, color, duration, periodicity, target_public_list_id, visio_link, place, document_id, public_comment, state) " +
                           "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id";

        String name = payloadGrid.getGridName();
        String ownerId = user.getUserId();
        String structureId = payloadGrid.getStructureId();
        String begin = DateHelper.formatDate(payloadGrid.getBeginDate());
        String end = DateHelper.formatDate(payloadGrid.getEndDate());
        String color = payloadGrid.getColor();
        String duration = DateHelper.formatDuration(payloadGrid.getDuration());
        Integer periodicity = payloadGrid.getPeriodicity();
        String targetPublicListId = payloadGrid.getTargetPublicIds().toString();
        String visioLink = payloadGrid.getVisioLink();
        String place = payloadGrid.getPlace();
        String documentId = payloadGrid.getDocumentId();
        String publicComment = payloadGrid.getPublicComment();
        String state = payloadGrid.getGridState().getValue();

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

        Sql.getInstance().preparedQuery(query, params, SqlResult.validUniqueResultHandler(handler));
    }
    
}
