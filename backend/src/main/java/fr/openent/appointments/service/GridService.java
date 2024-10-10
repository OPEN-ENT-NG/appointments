import io.vertx.core.Future;
import io.vertx.core.json.JsonArray;


public interface GridService {
    
    Future<JsonArray> getMyGrids();

    Future<JsonArray> getGridById(Integer gridId);

    Future<JsonArray> getUserGrids(Integer userId);

    Future<JsonArray> createGrid(JsonArray grid);

    Future<JsonArray> updateGrid(Integer gridId, JsonArray grid);

    Future<JsonArray> suspendGrid(Integer gridId);

    Future<JsonArray> restoreGrid(Integer gridId);

    Future<JsonArray> deleteGrid(Integer gridId);

}
