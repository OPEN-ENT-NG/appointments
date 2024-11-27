package fr.openent.appointments.service.impl;

import fr.openent.appointments.helper.DateHelper;
import fr.openent.appointments.helper.LogHelper;
import fr.openent.appointments.repository.AppointmentRepository;
import fr.openent.appointments.repository.GridRepository;
import fr.openent.appointments.repository.RepositoryFactory;
import fr.openent.appointments.repository.TimeSlotRepository;
import fr.openent.appointments.service.TimeSlotService;
import fr.openent.appointments.service.ServiceFactory;
import io.vertx.core.Future;
import io.vertx.core.Promise;
import io.vertx.core.json.JsonObject;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static fr.openent.appointments.core.constants.Fields.END_DATE;
import static fr.openent.appointments.core.constants.Fields.OWNER_ID;

/**
 * Default implementation of the TimeSlotService interface.
 */
public class DefaultTimeSlotService implements TimeSlotService {
    private final TimeSlotRepository timeSlotRepository;
    private final GridRepository gridRepository;
    private final AppointmentRepository appointmentRepository;

    public DefaultTimeSlotService(ServiceFactory serviceFactory, RepositoryFactory repositoryFactory) {
        this.timeSlotRepository = repositoryFactory.timeSlotRepository();
        this.gridRepository = repositoryFactory.gridRepository();
        this.appointmentRepository = repositoryFactory.appointmentRepository();
    }

    @Override
    public Future<Map<String, LocalDate>> getLastAppointmentDateByGridOwner(String userId, List<String> ownersIds) {
        Promise<Map<String, LocalDate>> promise = Promise.promise();

        timeSlotRepository.getLastAppointmentDateByGridOwner(userId, ownersIds)
            .onSuccess(lastDatesByOwnerId -> {
                Map<String, LocalDate> mapOwnerIdLastAppointmentDate = new HashMap<>();
                ownersIds.forEach(ownerId -> {
                    LocalDate lastAppointmentDate = lastDatesByOwnerId.stream()
                            .filter(JsonObject.class::isInstance)
                            .map(JsonObject.class::cast)
                            .filter(lastDateByOwnerId -> lastDateByOwnerId.getString(OWNER_ID).equals(ownerId))
                            .findFirst()
                            .map(lastDateByOwnerId -> DateHelper.parseDateTime(lastDateByOwnerId.getString(END_DATE, null)).toLocalDate())
                            .orElse(null);
                    mapOwnerIdLastAppointmentDate.put(ownerId, lastAppointmentDate);
                });

                promise.complete(mapOwnerIdLastAppointmentDate);
            })
            .onFailure(err -> {
                String errorMessage = "Failed to retrieve last appointment date for ownersIds " + ownersIds;
                LogHelper.logError(this, "getLastAppointmentDateByGridOwner", errorMessage, err.getMessage());
                promise.fail(err.getMessage());
            });

        return promise.future();
    }

    @Override
    public Future<Boolean> checkIfUserCanAccessTimeSlot(Long timeSlotId, String userId, List<String> userGroupsIds){
        Promise<Boolean> promise = Promise.promise();

        timeSlotRepository.get(timeSlotId)
            .compose(timeSlot -> {
                if(!timeSlot.isPresent()) {
                    String errorMessage = "TimeSlot with id " + timeSlotId + " not found";
                    return Future.failedFuture(errorMessage);
                }
                return gridRepository.get(timeSlot.get().getGridId());
            })
            .compose(grid -> {
                if(!grid.isPresent()) {
                    String errorMessage = "Grid with timeSlot id " + timeSlotId + " not found";
                    return Future.failedFuture(errorMessage);
                }
                return Future.succeededFuture(grid.get().getTargetPublicListId());
            })
            .onSuccess(
                targetPublicListId -> {
                    boolean isUserInTargetPublicList = targetPublicListId.stream().anyMatch(userGroupsIds::contains);
                    promise.complete(isUserInTargetPublicList);
                }
            )
            .onFailure(err -> {
                String errorMessage = "Failed to check if user can access timeSlot with id " + timeSlotId;
                LogHelper.logError(this, "checkIfUserCanAccessTimeSlot", errorMessage, err.getMessage());
                promise.fail(err.getMessage());
            });
        return promise.future();
    }

    @Override
    public Future<Boolean> checkIfTimeSlotIsAvailable(Long timeSlotId) {
        Promise<Boolean> promise = Promise.promise();

        appointmentRepository.getAvailableAppointments(timeSlotId)
            .onSuccess(appointments -> {
                if(appointments.isEmpty()) {
                    promise.complete(true);
                } else {
                    promise.complete(false);
                }
            })
            .onFailure(err -> {
                String errorMessage = "Failed to check if timeSlot with id " + timeSlotId + " is available";
                LogHelper.logError(this, "checkIfTimeSlotIsAvailable", errorMessage, err.getMessage());
                promise.fail(err.getMessage());
            });

        return promise.future();
    }
}
