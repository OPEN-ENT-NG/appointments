package fr.openent.appointments.model.workspace;

import fr.openent.appointments.helper.IModelHelper;
import fr.openent.appointments.model.IModel;
import io.vertx.core.json.JsonObject;

import static fr.openent.appointments.core.constants.Constants.*;
import static fr.openent.appointments.core.constants.Fields.*;

public class CompleteDocument implements IModel<CompleteDocument> {
    private String application;
    private String created;
    private String file;
    private Boolean isShared;
    private MetaData metaData;
    private String modified;
    private String name;
    private String owner;
    private String ownerName;
    private Boolean isProtected;
    private String id;

    public CompleteDocument(JsonObject document) {
        this.application = document.getString(APPLICATION);
        this.created = document.getString(CREATED);
        this.file = document.getString(FILE);
        this.isShared = document.getBoolean(CAMEL_IS_SHARED);
        this.metaData = new MetaData(document.getJsonObject(METADATA));
        this.modified = document.getString(MODIFIED);
        this.name = document.getString(NAME);
        this.owner = document.getString(OWNER);
        this.ownerName = document.getString(CAMEL_OWNER_NAME);
        this.isProtected = document.getBoolean(PROTECTED);
        this.id = document.getString(_ID);
    }

    // Getters

    public String getApplication() {
        return application;
    }

    public String getCreated() {
        return created;
    }

    public String getFile() {
        return file;
    }

    public Boolean getShared() {
        return isShared;
    }

    public MetaData getMetaData() {
        return metaData;
    }

    public String getModified() {
        return modified;
    }

    public String getName() {
        return name;
    }

    public String getOwner() {
        return owner;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public Boolean getProtected() {
        return isProtected;
    }

    public String getId() {
        return id;
    }

    // Setters

    public void setApplication(String application) {
        this.application = application;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public void setShared(Boolean shared) {
        isShared = shared;
    }

    public void setMetaData(MetaData metaData) {
        this.metaData = metaData;
    }

    public void setModified(String modified) {
        this.modified = modified;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public void setProtected(Boolean aProtected) {
        isProtected = aProtected;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Functions
    public JsonObject toJson() {
        return IModelHelper.toJson(this, false, false);
    }
}
