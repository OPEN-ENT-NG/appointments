package fr.openent.appointments.controller;

import fr.openent.appointments.enums.ShareRight;
import fr.openent.appointments.helper.LogHelper;
import fr.openent.appointments.security.CustomShareAndOwner;
import fr.wseduc.rs.ApiDoc;
import fr.wseduc.rs.Get;
import fr.wseduc.rs.Put;
import fr.wseduc.security.ActionType;
import fr.wseduc.security.SecuredAction;
import fr.wseduc.webutils.I18n;
import fr.wseduc.webutils.request.RequestUtils;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.entcore.common.controller.ControllerHelper;
import org.entcore.common.http.filter.ResourceFilter;
import org.entcore.common.user.UserUtils;

import static fr.openent.appointments.core.constants.Constants.CAMEL_DISPLAY_NAME;
import static fr.openent.appointments.core.constants.Fields.*;
import static fr.openent.appointments.core.constants.ShareRights.*;

public class SharingController extends ControllerHelper {

    public SharingController() {
        super();
    }

    @Override
    @Get("/share/json/:id")
    @ApiDoc("List rights for a given form")
    @ResourceFilter(CustomShareAndOwner.class)
    @SecuredAction(value = MANAGER_RESOURCE_RIGHT, type = ActionType.RESOURCE)
    public void shareJson(final HttpServerRequest request) {
        final String id = request.params().get(ID);

        if (id == null || id.trim().isEmpty()) {
            String errorMessage = "ID parameter must not be null or empty.";
            LogHelper.logError(this, "shareJson", errorMessage);
            badRequest(request);
        }

        UserUtils.getUserInfos(this.eb, request, user -> {
            if (user == null) {
                String errorMessage = "User not found in session.";
                LogHelper.logError(this, "shareJson", errorMessage);
                unauthorized(request);
                return;
            }

            super.shareService.shareInfos(user.getUserId(), id, I18n.acceptLanguage(request), request.params().get(SEARCH), shareInfosEvt -> {
                if (shareInfosEvt.isLeft()) {
                    String errorMessage = "Fail to get sharing infos";
                    LogHelper.logError(this, "shareJson", errorMessage, shareInfosEvt.left().getValue());
                    renderError(request);
                    return;
                }

                JsonObject shareInfos = shareInfosEvt.right().getValue().copy();
                JsonArray actions = shareInfos.getJsonArray(ACTIONS);

                for (int i = actions.size() - 1; i >= 0; i--) {
                    JsonObject action = actions.getJsonObject(i);
                    if (!action.getString(CAMEL_DISPLAY_NAME).equals(ShareRight.BOOK.getValue())) actions.remove(i);
                }

                renderJson(request, shareInfos);
            });
        });
    }

    @Put("/share/json/:id")
    @ApiDoc("Add rights for a given form")
    @ResourceFilter(CustomShareAndOwner.class)
    @SecuredAction(value = MANAGER_RESOURCE_RIGHT, type = ActionType.RESOURCE)
    public void shareSubmit(final HttpServerRequest request) {
        UserUtils.getUserInfos(eb, request, user -> {
            if (user == null) {
                String errorMessage = "User not found in session.";
                LogHelper.logError(this, "shareSubmit", errorMessage);
                unauthorized(request);
                return;
            }

            SharingController.super.shareJsonSubmit(request, null, false, new JsonObject(), null);
        });
    }

    @Put("/share/resource/:id")
    @ApiDoc("Add rights for a given form")
    @ResourceFilter(CustomShareAndOwner.class)
    @SecuredAction(value = MANAGER_RESOURCE_RIGHT, type = ActionType.RESOURCE)
    public void shareResource(final HttpServerRequest request) {
        final String gridId = request.params().get(ID);

        RequestUtils.bodyToJson(request, pathPrefix + "share", shareObjectJson -> {
            if (shareObjectJson == null || shareObjectJson.isEmpty()) {
                String errorMessage = "No grid to share.";
                LogHelper.logError(this, "shareResource", errorMessage);
                noContent(request);
                return;
            }

            UserUtils.getUserInfos(eb, request, user -> {
                if (user == null) {
                    String errorMessage = "User not found in session.";
                    LogHelper.logError(this, "shareResource", errorMessage);
                    unauthorized(request);
                    return;
                }

                // Classic sharing stuff (putting or removing ids from form_shares table accordingly)
                this.getShareService().share(user.getUserId(), gridId, shareObjectJson, (r) -> {
                    if (r.isLeft()) {
                        String errorMessage = "Failed to share grid with id " + gridId;
                        LogHelper.logError(this, "shareResource", errorMessage);
                        renderError(request);
                        return;
                    }

                    this.doShareSucceed(request, gridId, user, shareObjectJson, r.right().getValue(), false);
                });
            });
        });
    }
}