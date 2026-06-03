package fr.openent.appointments.service.impl;

import fr.openent.appointments.enums.ShareRight;
import fr.openent.appointments.helper.LogHelper;
import fr.openent.appointments.model.UserAppointment;
import fr.openent.appointments.model.database.Grid;
import fr.openent.appointments.model.database.GridShare;
import fr.openent.appointments.model.database.NeoUser;
import fr.openent.appointments.repository.GridRepository;
import fr.openent.appointments.repository.GridSharesRepository;
import fr.openent.appointments.service.CommunicationService;
import fr.openent.appointments.repository.CommunicationRepository;
import fr.openent.appointments.repository.RepositoryFactory;
import fr.openent.appointments.service.GridService;
import fr.openent.appointments.service.ServiceFactory;
import fr.openent.appointments.service.TimeSlotService;
import io.vertx.core.Future;
import io.vertx.core.Promise;
import io.vertx.core.json.JsonObject;
import org.entcore.common.user.UserInfos;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static fr.openent.appointments.core.constants.Constants.CAMEL_AVAILABLE_GRIDS_IDS;

/**
 * Default implementation of the CommunicationService interface.
 */
public class DefaultCommunicationService implements CommunicationService {
    private final TimeSlotService timeSlotService;
    private final GridService gridService;
    private final CommunicationRepository communicationRepository;
    private final GridRepository gridRepository;
    private final GridSharesRepository gridShareRepository;

    public DefaultCommunicationService(ServiceFactory serviceFactory, RepositoryFactory repositoryFactory) {
        this.timeSlotService = serviceFactory.timeSlotService();
        this.gridService = serviceFactory.gridService();
        this.communicationRepository = repositoryFactory.communicationRepository();
        this.gridRepository = repositoryFactory.gridRepository();
        this.gridShareRepository = repositoryFactory.gridShareRepository();
    }

    @Override
    public Future<List<UserAppointment>> getUsers(UserInfos userInfos, String search, Long page, Long limit) {
        Promise<List<UserAppointment>> promise = Promise.promise();

        List<String> allUsersIds = new ArrayList<>();

        communicationRepository.getUsersICanCommunicateWithGoodRights(userInfos.getUserId())
            .compose(neoUsers -> {
                allUsersIds.addAll(neoUsers.stream()
                        .map(NeoUser::getId)
                        .collect(Collectors.toList()));
                return gridService.getUserIdsWhoSharedAGridWithMe(userInfos);
            })
            .compose(usersIds -> {
                allUsersIds.addAll(usersIds);
                return communicationRepository.getUsersFromUsersIds(allUsersIds, userInfos.getStructures());
            })
            .compose(neoUsers -> {
                List<NeoUser> filteredUsers = filterNeoUsersBySearchAndPagination(neoUsers, search, page, limit);
                return getGridsAndBuildListUserAppointmentResponse(userInfos, filteredUsers);
            })
            .onSuccess(promise::complete)
            .onFailure(err -> {
                String errorMessage = "Failed to retrieve users I can communicate with";
                LogHelper.logError(this, "getUsersICanCommunicateWith", errorMessage, err.getMessage());
                promise.fail(err);
            });

        return promise.future();
    }

    public Future<List<NeoUser>> getUsernamesFromUserIds(List<String> usersIds) {
        return communicationRepository.getSimplifiedUsersByUserIds(usersIds);
    }

    public Future<List<NeoUser>> getUsersFromGroupsIds(List<String> groupsIds) {
        return communicationRepository.getUsersFromGroupsIds(groupsIds);
    }

    // Private functions

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

        // sort by displayName
        uniqueAndFilteredUsers.sort(
            (user1, user2) -> user1.getDisplayName().compareToIgnoreCase(user2.getDisplayName())
        );

        if (page != null && page >= 1 && limit != null && limit >= 1) {
            uniqueAndFilteredUsers = uniqueAndFilteredUsers.stream()
                .skip((page - 1) * limit)
                .limit(limit)
                .collect(Collectors.toList());
        }

        return uniqueAndFilteredUsers;
    }

    private Future<List<UserAppointment>> getGridsAndBuildListUserAppointmentResponse(UserInfos user, List<NeoUser> users) {
        Promise<List<UserAppointment>> promise = Promise.promise();

        List<String> otherUsersIds = users.stream().map(NeoUser::getId).collect(Collectors.toList());
        List<Number> gridIdsSharedWithMe = new ArrayList<>();

        gridShareRepository.getGridsSharedWithMeByRight(user, ShareRight.BOOK)
            .compose(gridShares -> {
                gridIdsSharedWithMe.addAll(gridShares.stream().map(GridShare::getResourceId).collect(Collectors.toList()));
                return gridRepository.getGridsByUserIds(otherUsersIds);
            })
            .compose(grids -> {
                // Filter grids in order to keep only grids that the user can access
                List<Grid> filteredGrids = grids.stream()
                                                .filter(grid -> gridIdsSharedWithMe.contains(grid.getId()))
                                                .collect(Collectors.toList());
                return getAdditionalInfosAndBuildListUserAppointmentResponse(user.getUserId(), filteredGrids, users);
            })
            .onSuccess(promise::complete)
            .onFailure(err -> {
                String errorMessage = "Failed to retrieve grids associated with users ids " + otherUsersIds;
                LogHelper.logError(this, "getGridsAndBuildListUserAppointmentResponse", errorMessage, err.getMessage());
                promise.fail(err);
            });

        return promise.future();
    }

    private Future<List<UserAppointment>> getAdditionalInfosAndBuildListUserAppointmentResponse(String userId, List<Grid> grids, List<NeoUser> users) {
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

                promise.complete(buildListUserAppointmentResponse(usersMap, grids, availabilities));
            })
            .onFailure(err -> {
                String errorMessage = "Failed get additional infos to build UserAppointment";
                LogHelper.logError(this, "getAdditionalInfosAndBuildListUserAppointmentResponse", errorMessage, err.getMessage());
                promise.fail(err);
            });

        return promise.future();
    }

    private List<UserAppointment> buildListUserAppointmentResponse(Map<NeoUser,LocalDate> users, List<Grid> grids, List<Long> availableGridsIds) {
        List<UserAppointment> listUserAppointmentResponse = new ArrayList<>();

        users.forEach((user, lastAppointmentDate) -> {
                List<Long> userGridIds = grids.stream()
                        .filter(grid -> grid.getOwnerId().equals(user.getId()))
                        .map(Grid::getId)
                        .collect(Collectors.toList());
                boolean availability = availableGridsIds.stream().anyMatch(userGridIds::contains);
                listUserAppointmentResponse.add(new UserAppointment(user, lastAppointmentDate, availability));
            });

        listUserAppointmentResponse.sort((user1, user2) -> user1.getDisplayName().compareToIgnoreCase(user2.getDisplayName()));

        return listUserAppointmentResponse;
    }
}
