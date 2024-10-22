package fr.openent.appointments.service.impl;

import fr.openent.appointments.service.CommunicationService;
import fr.openent.appointments.repository.CommunicationRepository;
import fr.openent.appointments.service.ServiceFactory;
import fr.openent.appointments.repository.RepositoryFactory;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.Future;
import io.vertx.core.Promise;
import io.vertx.core.json.JsonArray;

import org.entcore.common.neo4j.Neo4j;

public class DefaultCommunicationService implements CommunicationService {
    private final EventBus eb;
    private final CommunicationRepository communicationRepository;

    public DefaultCommunicationService(ServiceFactory serviceFactory, RepositoryFactory repositoryFactory) {
        this.eb = serviceFactory.eventBus();
        this.communicationRepository = repositoryFactory.communicationRepository();
    }

    @Override
    public Future<JsonArray> getVisibleGroups(String userId) {
        Promise<JsonArray> promise = Promise.promise();

        communicationRepository.getVisibleGroups(userId)
            .onSuccess(groups -> promise.complete(groups))
            .onFailure(err -> promise.fail(err));
        
        return promise.future();
    }
}
