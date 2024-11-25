package fr.openent.appointments.controller;

import fr.openent.appointments.security.ViewRight;
import fr.openent.appointments.service.AppointmentService;
import fr.openent.appointments.service.ServiceFactory;
import fr.wseduc.rs.ApiDoc;
import fr.wseduc.rs.Post;
import fr.wseduc.security.ActionType;
import fr.wseduc.security.SecuredAction;
import org.entcore.common.controller.ControllerHelper;
import org.entcore.common.http.filter.ResourceFilter;

public class AppointmentController extends ControllerHelper {
    private final AppointmentService appointmentService;

    public AppointmentController(ServiceFactory serviceFactory) {
        this.appointmentService = serviceFactory.appointmentService();
    }

    @Post("/appointments/:timeSlotId")
    @ApiDoc("Create an appointment linked to a time slot")
    @ResourceFilter(ViewRight.class)
    @SecuredAction(value="", type= ActionType.RESOURCE)
    public void createAppointment(String timeSlotId) {
        renderJson(appointmentService.createAppointment(timeSlotId, this.getBody()));
    }
}