package fr.openent.appointments.service;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;

public interface NotifyService {

    /**
     * Notify new appointment
     * @param request HttpServerRequest
     */
    void notifyNewAppointment(HttpServerRequest request);
}
