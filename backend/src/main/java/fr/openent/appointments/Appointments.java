package fr.openent.appointments;

import fr.openent.appointments.controller.MainController;
import fr.openent.appointments.controller.GridController;
import fr.openent.appointments.repository.RepositoryFactory;
import fr.openent.appointments.service.ServiceFactory;
import io.vertx.core.eventbus.EventBus;
import org.entcore.common.sql.Sql;
import org.entcore.common.http.BaseServer;

public class Appointments extends BaseServer {

    public static final String VIEW_RIGHT = "appointments.view";

    @Override
    public void start() throws Exception {
        super.start();

        EventBus eb = getEventBus(vertx);

        final Sql sql = Sql.getInstance();

        RepositoryFactory repositoryFactory = new RepositoryFactory(sql);
        ServiceFactory serviceFactory = new ServiceFactory(vertx, repositoryFactory);

        addController(new MainController());
        addController(new GridController(serviceFactory));
    }
}