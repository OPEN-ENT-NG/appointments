package fr.openent.appointments.repository;

import fr.openent.appointments.model.payload.GridPayload;
import io.vertx.core.Future;
import io.vertx.core.json.JsonObject;
import io.vertx.core.json.JsonArray;

public interface GridRepository {
    
    Future<JsonObject> create(GridPayload grid, String userId);

}
