package fr.openent.appointments.repository.impl;

import fr.openent.appointments.enums.ShareRight;
import fr.openent.appointments.helper.IModelHelper;
import fr.openent.appointments.helper.LogHelper;
import fr.openent.appointments.helper.UserFunctionHelper;
import fr.openent.appointments.model.database.GridShare;
import fr.openent.appointments.repository.GridSharesRepository;
import fr.openent.appointments.repository.RepositoryFactory;
import io.vertx.core.Future;
import io.vertx.core.Promise;
import io.vertx.core.json.JsonArray;
import org.entcore.common.sql.Sql;
import org.entcore.common.sql.SqlResult;
import org.entcore.common.user.UserInfos;

import java.util.ArrayList;
import java.util.List;

import static fr.openent.appointments.core.constants.SqlTables.DB_GRID_SHARES_TABLE;
import static fr.openent.appointments.core.constants.SqlTables.DB_MEMBERS_TABLE;

/**
 * Default implementation of the GridSharesRepository interface.
 */
public class DefaultGridSharesRepository implements GridSharesRepository {
    private final Sql sql;

    public DefaultGridSharesRepository(RepositoryFactory repositoryFactory) {
        this.sql = repositoryFactory.sql();
    }

    @Override
    public Future<List<GridShare>> getGridsSharedWithMeByRight(UserInfos user, ShareRight right) {
        Promise<List<GridShare>> promise = Promise.promise();

        if (right == null) {
            promise.complete(new ArrayList<>());
            return promise.future();
        }

        List<String> groupsAndUserIds = UserFunctionHelper.getIdAndGroupIds(user);

        String query = "SELECT * FROM " + DB_GRID_SHARES_TABLE + " " +
                "WHERE member_id IN " + Sql.listPrepared(groupsAndUserIds) + " AND action = ?;";
        JsonArray params = new JsonArray(groupsAndUserIds).add(right.getAction());

        String errorMessage = "Fail to get grids shared with right " + right + " to current user";
        String errorLogMessage = LogHelper.constructLogMessage(this, "getGridsShareWithMeByRight", errorMessage);
        sql.prepared(query, params, SqlResult.validResultHandler(IModelHelper.resultToIModel(promise, GridShare.class, errorLogMessage)));

        return promise.future();
    }

    @Override
    public Future<List<GridShare>> getGridSharesInfosByGridAndRight(Long gridId, ShareRight right) {
        Promise<List<GridShare>> promise = Promise.promise();

        String query = "SELECT gs.*, m.group_id IS NOT NULL AS is_group " +
                "FROM " + DB_GRID_SHARES_TABLE + " gs " +
                "JOIN " + DB_MEMBERS_TABLE + " m ON gs.member_id = m.id " +
                "WHERE resource_id = ? AND action = ?;";
        JsonArray params = new JsonArray().add(gridId).add(right.getAction());

        String errorMessage = "Fail to get grid share infos for grid with id " + gridId;
        String errorLogMessage = LogHelper.constructLogMessage(this, "getGridsSharedByGridId", errorMessage);
        sql.prepared(query, params, SqlResult.validResultHandler(IModelHelper.resultToIModel(promise, GridShare.class, errorLogMessage)));

        return promise.future();
    }
}
