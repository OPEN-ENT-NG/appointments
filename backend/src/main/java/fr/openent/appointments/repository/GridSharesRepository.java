package fr.openent.appointments.repository;

import fr.openent.appointments.enums.ShareRight;
import fr.openent.appointments.model.database.GridShare;
import io.vertx.core.Future;
import io.vertx.core.json.JsonArray;
import org.entcore.common.user.UserInfos;

import java.util.List;

public interface GridSharesRepository {

    /**
     * Retrieve grids share infos where connected user's has the specified right
     *
     * @param user The connected user
     * @param right The right of the current user on searched grids
     * @return A {@link Future} representing the asynchronous operation, which will return
     *         a {@link List<GridShare>} containing all the grid share to the current user with
     *         the specified right.
     */
    Future<List<GridShare>> getGridsSharedWithMeByRight(UserInfos user, ShareRight right);

    /**
     * Retrieve grids share infos for the specified grid id
     *
     * @param gridId The id of the grid
     * @param right The right of the current user on searched grids
     * @return A {@link Future} representing the asynchronous operation, which will return
     *         a {@link List<GridShare>} containing all the grid share to the current user with
     *         the specified right.
     */
    Future<List<GridShare>> getGridSharesInfosByGridAndRight(Long gridId, ShareRight right);
}
