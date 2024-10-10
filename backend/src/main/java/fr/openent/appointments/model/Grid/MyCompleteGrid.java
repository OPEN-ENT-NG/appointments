package fr.openent.appointments.model;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;

import fr.openent.appointments.enums.GridState;
import fr.openent.appointments.helper.DateHelper;

public class MyCompleteGrid extends MyMinimalGrid{
    private String structureId;
    private Duration duration;
    private Integer periodicity;
    private List<String> targetPublicIds;
    private String visioLink;
    private String place;
    private String documentId;
    private String publicComment;  

    public MyCompleteGrid(JsonObject completeGrid){
        super(completeGrid);
        this.structureId = completeGrid.getString("structureId");
        this.duration = DateHelper.parseDuration(completeGrid.getString("duration"));
        this.periodicity = completeGrid.getInteger("periodicity");
        JsonArray JsonArray = completeGrid.getJsonArray("targetPublicIds");
        JsonArray.forEach(targetPublicId -> {
            this.targetPublicIds.add(targetPublicId.toString());
        });
        this.visioLink = completeGrid.getString("visioLink");
        this.place = completeGrid.getString("place");
        this.documentId = completeGrid.getString("documentId");
        this.publicComment = completeGrid.getString("publicComment");
    }

    public String getStructureId() {
        return structureId;
    }

    public void setStructureId(String structureId) {
        this.structureId = structureId;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public Integer getPeriodicity() {
        return periodicity;
    }

    public void setPeriodicity(Integer periodicity) {
        this.periodicity = periodicity;
    }

    public List<String> getTargetPublicIds() {
        return targetPublicIds;
    }

    public void setTargetPublicIds(List<String> targetPublicIds) {
        this.targetPublicIds = targetPublicIds;
    }

    public String getVisioLink() {
        return visioLink;
    }

    public void setVisioLink(String visioLink) {
        this.visioLink = visioLink;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getDocumentId() {
        return documentId;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }

    public String getPublicComment() {
        return publicComment;
    }

    public void setPublicComment(String publicComment) {
        this.publicComment = publicComment;
    }  
}
