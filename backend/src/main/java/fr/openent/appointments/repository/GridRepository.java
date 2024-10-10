package fr.openent.appointments.repository;

import fr.openent.appointments.model.grid.PayloadGrid;
import fr.wseduc.webutils.Either;

import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;

import org.entcore.common.user.UserInfos;


public interface GridRepository {
    
    public void create(PayloadGrid payloadGrid, UserInfos user, Handler<Either<String, JsonObject>> handler);

}
