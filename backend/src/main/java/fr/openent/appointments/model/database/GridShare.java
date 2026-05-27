package fr.openent.appointments.model.database;

import fr.openent.appointments.model.IModel;
import io.vertx.core.json.JsonObject;

import static fr.openent.appointments.core.constants.Constants.ACTION;
import static fr.openent.appointments.core.constants.Fields.*;

public class GridShare implements IModel<GridShare> {
    private String memberId;
    private Number resourceId;
    private String action;
    private Boolean isGroup;


    // Constructors

    public GridShare() {}

    public GridShare(JsonObject formShare) {
        this.memberId = formShare.getString(MEMBER_ID, null);
        this.resourceId = formShare.getNumber(RESOURCE_ID, null);
        this.action = formShare.getString(ACTION, null);
        this.isGroup = formShare.getBoolean(IS_GROUP, null);
    }


    // Getters

    public String getMemberId() { return memberId; }

    public Number getResourceId() { return resourceId; }

    public String getAction() { return action; }

    public Boolean getIsGroup() { return isGroup; }


    // Setters

    public GridShare setMemberId(String memberId) {
        this.memberId = memberId;
        return this;
    }

    public GridShare setResourceId(Number resourceId) {
        this.resourceId = resourceId;
        return this;
    }

    public GridShare setAction(String action) {
        this.action = action;
        return this;
    }

    public GridShare setIsGroup(Boolean isGroup) {
        this.isGroup = isGroup;
        return this;
    }


    // Functions

    public JsonObject toJson() {
        return new JsonObject()
                .put(MEMBER_ID, this.memberId)
                .put(RESOURCE_ID, this.resourceId)
                .put(ACTION, this.action)
                .put(IS_GROUP, this.isGroup);
    }
}

