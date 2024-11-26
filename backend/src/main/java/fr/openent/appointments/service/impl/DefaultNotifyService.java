package fr.openent.appointments.service.impl;

import fr.openent.appointments.service.NotifyService;
import fr.openent.appointments.service.ServiceFactory;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.http.HttpServerRequest;
import org.entcore.common.notification.TimelineHelper;

public class DefaultNotifyService implements NotifyService {
    private final TimelineHelper timelineHelper;

    public DefaultNotifyService(ServiceFactory serviceFactory) {
        this.timelineHelper = serviceFactory.timelineHelper();

    }

    @Override
    public void notifyNewAppointment(HttpServerRequest request){
        return;
    }
}
