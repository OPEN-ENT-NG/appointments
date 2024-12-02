package fr.openent.appointments.service.impl;

import fr.openent.appointments.helper.LogHelper;
import fr.openent.appointments.model.UserAppointment;
import fr.openent.appointments.model.database.Grid;
import fr.openent.appointments.model.database.NeoGroup;
import fr.openent.appointments.model.database.NeoUser;
import fr.openent.appointments.repository.GridRepository;
import fr.openent.appointments.service.CommunicationService;
import fr.openent.appointments.repository.CommunicationRepository;
import fr.openent.appointments.repository.RepositoryFactory;
import fr.openent.appointments.service.GridService;
import fr.openent.appointments.service.ServiceFactory;
import fr.openent.appointments.service.TimeSlotService;
import io.vertx.core.Future;
import io.vertx.core.Promise;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static fr.openent.appointments.core.constants.Constants.CAMEL_AVAILABLE_GRIDS_IDS;
import static fr.openent.appointments.core.constants.Constants.STRUCTURES;

/**
 * Default implementation of the CommunicationService interface.
 */
public class DefaultCommunicationService implements CommunicationService {
    private final TimeSlotService timeSlotService;
    private final GridService gridService;
    private final CommunicationRepository communicationRepository;
    private final GridRepository gridRepository;

    public DefaultCommunicationService(ServiceFactory serviceFactory, RepositoryFactory repositoryFactory) {
        this.timeSlotService = serviceFactory.timeSlotService();
        this.gridService = serviceFactory.gridService();
        this.communicationRepository = repositoryFactory.communicationRepository();
        this.gridRepository = repositoryFactory.gridRepository();
    }


    @Override
    public Future<JsonArray> getGroupsCanCommunicateWithMe(String userId, String structureId){
        Promise<JsonArray> promise = Promise.promise();

        communicationRepository.getGroupsCanCommunicateWithMe(userId, structureId)
            .onSuccess(promise::complete)
            .onFailure(err -> {
                String errorMessage = "Failed to retrieve groups allow to communicate with me";
                LogHelper.logError(this, "getGroupsCanCommunicateWithMe", errorMessage, err.getMessage());
                promise.fail(err);
            });

        return promise.future();
    }

    @Override
    public Future<List<UserAppointment>> getUsersICanCommunicateWith(String userId, String search, Long page, Long limit) {
        Promise<List<UserAppointment>> promise = Promise.promise();

        communicationRepository.getGroupsICanCommunicateWith(userId)
            .compose(groups -> {
                List<String> groupsIds = groups.stream()
                        .map(NeoGroup::getId)
                        .collect(Collectors.toList());
                return getUsersFromGroupsIds(userId, groupsIds);
            })
            .compose(users -> {
                List<NeoUser> filteredUsers = filterNeoUsersBySearchAndPagination(users, search, page, limit);
                return getGridsAndBuildListUserAppointementResponse(userId, filteredUsers);
            })
            .onSuccess(promise::complete)
            .onFailure(err -> {
                String errorMessage = "Failed to retrieve users I can communicate with";
                LogHelper.logError(this, "getUsersICanCommunicateWith", errorMessage, err.getMessage());
                promise.fail(err);
            });

        return promise.future();
    }

    // Private functions

    private Future<List<NeoUser>> getUsersFromGroupsIds(String userId, List<String> groupsIds) {
        Promise<List<NeoUser>> promise = Promise.promise();

        communicationRepository.getUserStructuresExternalIds(userId)
            .compose(structures -> {
                List<String> structuresIds = structures
                        .getJsonObject(0)
                        .getJsonArray(STRUCTURES)
                        .stream()
                        .filter(String.class::isInstance)
                        .map(String.class::cast)
                        .collect(Collectors.toList());
                return communicationRepository.getUsersFromGroupsIds(groupsIds, structuresIds);
            })
            .onSuccess(promise::complete)
            .onFailure(err -> {
                String errorMessage = "Failed to retrieve users from groupsIds and current user id ";
                LogHelper.logError(this, "getUsersFromGroupsIds", errorMessage, err.getMessage());
                promise.fail(err);
            });

        return promise.future();
    }

    private List<NeoUser> filterNeoUsersBySearchAndPagination(List<NeoUser> users, String search, Long page, Long limit) {
        List<NeoUser> uniqueAndFilteredUsers = new ArrayList<>(users.stream()
                .collect(Collectors.toMap(
                        NeoUser::getId,
                        user -> user,
                        (existing, replacement) -> existing
                ))
                .values());

        if (search != null && !search.isEmpty()) {
            uniqueAndFilteredUsers = uniqueAndFilteredUsers.stream()
                .filter(user -> user.getDisplayName().toLowerCase().contains(search.toLowerCase()) ||
                                user.getFunctions().stream().anyMatch(fn -> fn.toLowerCase().contains(search.toLowerCase())))
                .collect(Collectors.toList());
        }

        if (page != null && page >= 1 && limit != null && limit >= 1) {
            uniqueAndFilteredUsers = uniqueAndFilteredUsers.stream()
                .skip((page - 1) * limit)
                .limit(limit)
                .collect(Collectors.toList());
        }

        return uniqueAndFilteredUsers;
    }

    private Future<List<UserAppointment>> getGridsAndBuildListUserAppointementResponse(String userId, List<NeoUser> users) {
        Promise<List<UserAppointment>> promise = Promise.promise();

        List<String> usersIds = users.stream().map(NeoUser::getId).collect(Collectors.toList());
        gridRepository.getGridsByUserIds(usersIds)
            .compose(grids -> getAdditionalInfosAndBuildListUserAppointementResponse(userId, grids, users))
            .onSuccess(promise::complete)
            .onFailure(err -> {
                String errorMessage = "Failed to retrieve grids associated with users ids " + usersIds;
                LogHelper.logError(this, "getGridsAndBuildListUserAppointementResponse", errorMessage, err.getMessage());
                promise.fail(err);
            });

        return promise.future();
    }

    private Future<List<UserAppointment>> getAdditionalInfosAndBuildListUserAppointementResponse(String userId, List<Grid> grids, List<NeoUser> users) {
        Promise<List<UserAppointment>> promise = Promise.promise();
        JsonObject composeInfos = new JsonObject();

        List<Long> gridsIds = grids.stream().map(Grid::getId).collect(Collectors.toList());
        gridService.getGridsIdsWithAvailableTimeSlots(gridsIds)
            .compose(availableGridsIds -> {
                composeInfos.put(CAMEL_AVAILABLE_GRIDS_IDS, availableGridsIds);
                List<String> ownersIds = users.stream().map(NeoUser::getId).collect(Collectors.toList());
                return timeSlotService.getLastAppointmentDateByGridOwner(userId, ownersIds);
            })
            .onSuccess(ownerIdsLastDateMap -> {
                Map<NeoUser, LocalDate> usersMap = new HashMap<>();
                users.forEach(user -> {
                    LocalDate lastAppointmentDate = ownerIdsLastDateMap.getOrDefault(user.getId(), null);
                    usersMap.put(user, lastAppointmentDate);
                });

                List<Long> availabilities = composeInfos.getJsonArray(CAMEL_AVAILABLE_GRIDS_IDS).stream()
                        .filter(Long.class::isInstance)
                        .map(Long.class::cast)
                        .collect(Collectors.toList());

                promise.complete(buildListUserAppointementResponse(usersMap, grids, availabilities));
            })
            .onFailure(err -> {
                String errorMessage = "Failed get additional infos to build UserAppointment";
                LogHelper.logError(this, "getAdditionalInfosAndBuildListUserAppointementResponse", errorMessage, err.getMessage());
                promise.fail(err);
            });

        return promise.future();
    }

    private List<UserAppointment> buildListUserAppointementResponse(Map<NeoUser,LocalDate> users, List<Grid> grids, List<Long> availableGridsIds) {
        List<UserAppointment> listUserAppointementResponse = new ArrayList<>();

        users.forEach((user, lastAppointmentDate) -> {
                List<Long> userGridIds = grids.stream()
                        .filter(grid -> grid.getOwnerId().equals(user.getId()))
                        .map(Grid::getId)
                        .collect(Collectors.toList());
                boolean availability = availableGridsIds.stream().anyMatch(userGridIds::contains);
                listUserAppointementResponse.add(new UserAppointment(user, lastAppointmentDate, availability));
            });

        return listUserAppointementResponse;
    }
}
