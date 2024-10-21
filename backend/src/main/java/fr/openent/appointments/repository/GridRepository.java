package fr.openent.appointments.repository;

import fr.openent.appointments.model.payload.GridPayload;
import io.vertx.core.Future;
import io.vertx.core.json.JsonObject;
import io.vertx.core.json.JsonArray;

public interface GridRepository {
    
    /**
     * Creates a new grid based on the provided {@link GridPayload} and associates it with a specific user.
     *
     * @param grid   the {@link GridPayload} object containing the details of the grid to be created.
     * @param userId the unique identifier of the user creating the grid.
     * @return a {@link Future} representing the asynchronous operation, which will
     *         return a {@link JsonObject} containing the result of the creation
     *         operation. This object may include the newly created grid's details or 
     *         an error message if the operation fails.
     */
    Future<JsonObject> create(GridPayload grid, String userId);

}
