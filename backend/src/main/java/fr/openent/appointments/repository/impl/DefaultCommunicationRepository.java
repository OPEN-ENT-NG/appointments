package fr.openent.appointments.repository.impl;

import fr.openent.appointments.helper.IModelHelper;
import fr.openent.appointments.model.database.NeoGroup;
import fr.openent.appointments.model.database.NeoUser;
import fr.openent.appointments.repository.CommunicationRepository;
import fr.openent.appointments.repository.RepositoryFactory;
import fr.openent.appointments.helper.FutureHelper;
import io.vertx.core.Future;
import io.vertx.core.Promise;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.entcore.common.neo4j.Neo4j;
import org.entcore.common.neo4j.Neo4jResult;

import java.util.List;

import static fr.openent.appointments.core.constants.Constants.*;

public class DefaultCommunicationRepository implements CommunicationRepository {

    private final Neo4j neo4j;

    public DefaultCommunicationRepository(RepositoryFactory repositoryFactory) {
        this.neo4j = repositoryFactory.neo4j();
    }

    public Future<JsonArray> getGroupsCanCommunicateWithMe(String userId, String structureId) {
        Promise<JsonArray> promise = Promise.promise();

        String query = getCommunicationQuery(true, structureId);
        JsonObject params = new JsonObject()
                .put(CAMEL_USER_ID, userId)
                .put(CAMEL_STRUCTURE_ID, structureId);

        String errorMessage = "[Appointments@DefaultCommunicationRepository::getGroupsCanCommunicateWithMe] Fail to retrieve visible groups : ";
        neo4j.execute(query, params, Neo4jResult.validResultHandler(FutureHelper.handlerEither(promise, errorMessage)));

        return promise.future();
    }

    @Override
    public Future<JsonArray> getUserStructuresExternalIds(String userId) {
        Promise<JsonArray> promise = Promise.promise();

        String query = "MATCH(u:User { id: {userId}}) RETURN u.structures AS structures;";
        JsonObject params = new JsonObject().put(CAMEL_USER_ID, userId);

        String errorMessage = "[Appointments@DefaultCommunicationRepository::getUserStructuresExternalIds] Fail to retrieve user's structures : ";
        neo4j.execute(query, params, Neo4jResult.validResultHandler(FutureHelper.handlerEither(promise, errorMessage)));

        return promise.future();
    }

    @Override
    public Future<List<NeoGroup>> getGroupsICanCommunicateWith(String userId) {
        Promise<List<NeoGroup>> promise = Promise.promise();

        String query = getCommunicationQuery(false, null);
        JsonObject params = new JsonObject().put(CAMEL_USER_ID, userId);

        String errorMessage = "[Appointments@DefaultCommunicationRepository::getGroupsICanCommunicateWith] Fail to retrieve groups : ";
        neo4j.execute(query, params, Neo4jResult.validResultHandler(IModelHelper.sqlResultToIModel(promise, NeoGroup.class, errorMessage)));

        return promise.future();
    }

    @Override
    public Future<List<NeoUser>> getUsersFromGroupsIds(List<String> groupsIds, List<String> structuresExternalIds) {
        Promise<List<NeoUser>> promise = Promise.promise();

        String query = "MATCH (g:Group)<-[:IN]-(u:User) " +
                "WHERE g.id IN {groupsIds} " +
                "OPTIONAL MATCH (u)-[:USERBOOK]->(ub:UserBook) " +
                "WITH u, ub, [func IN u.functions WHERE split(func, \"$\")[0] IN {structuresExternalIds}] AS filteredFunctions " +
                "RETURN u.id AS id, u.displayName AS displayName, filteredFunctions AS functions, ub.picture AS picture;";
        JsonObject params = new JsonObject().put(CAMEL_GROUPS_IDS, groupsIds).put(CAMEL_STRUCTURES_EXTERNAL_IDS, structuresExternalIds);

        String errorMessage = "[Appointments@DefaultCommunicationRepository::getUsersFromGroupsIds] Fail to retrieve users infos from groups ids : ";
        neo4j.execute(query, params, Neo4jResult.validResultHandler(IModelHelper.sqlResultToIModel(promise, NeoUser.class, errorMessage)));

        return promise.future();
    }

    private String getCommunicationQuery(boolean isIncoming, String structureId) {
        return "MATCH (g:Group)<-[:COMMUNIQUE]-(u:User { id: {userId}}) " +
                "WHERE exists(g.id) " +
                "OPTIONAL MATCH (sg:Structure)<-[:DEPENDS]-(g) " +
                "OPTIONAL MATCH (sc:Structure)<-[:BELONGS]-(c:Class)<-[:DEPENDS]-(g) " +
                "WITH COALESCE(sg, sc) as s, c, g " +
                (structureId != null ? "WHERE s.id = {structureId} " : "") +
                "WITH s, c, g " +
                "RETURN DISTINCT " +
                "   g.id as id, " +
                "   g.name as name " +

                "UNION " +

                "MATCH (u:User {id: {userId}})-[:IN]->(ug:Group) " +
                "MATCH (g:Group)" + (isIncoming ? "<-[:COMMUNIQUE]-(ug) " : "-[:COMMUNIQUE]->(ug) ") +
                "WHERE exists(g.id) " +
                "OPTIONAL MATCH (sg:Structure)<-[:DEPENDS]-(g) " +
                "OPTIONAL MATCH (sc:Structure)<-[:BELONGS]-(c:Class)<-[:DEPENDS]-(g) " +
                "WITH COALESCE(sg, sc) as s, c, g " +
                (structureId != null ? "WHERE s.id = {structureId} " : "") +
                "WITH s, c, g " +
                "RETURN DISTINCT " +
                "   g.id as id, " +
                "   g.name as name;";
    }
}
