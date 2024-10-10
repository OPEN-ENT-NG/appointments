package fr.openent.appointments.model.grid;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;

import fr.openent.appointments.core.constants.SqlColumns;
import fr.openent.appointments.enums.GridState;
import fr.openent.appointments.enums.Periodicity;
import fr.openent.appointments.helper.DateHelper;

public class MyCompleteGrid extends MyMinimalGrid{
    private String structureId;
    private Duration duration;
    private Periodicity periodicity;
    private List<String> targetPublicIds;
    private String visioLink;
    private String place;
    private String documentId;
    private String publicComment;  

    public MyCompleteGrid(JsonObject completeGrid){
        super(completeGrid);
        this.structureId = completeGrid.getString(GRID_STRUCTURE_ID);
        this.duration = DateHelper.parseDuration(completeGrid.getString(GRID_DURATION));
        this.periodicity = Periodicity.from(completeGrid.getInteger(GRID_PERIODICITY));
        JsonArray JsonArray = completeGrid.getJsonArray(GRID_TARGET_PUBLIC_LIST_ID);
        JsonArray.forEach(targetPublicId -> {
            this.targetPublicIds.add(targetPublicId.toString());
        });
        this.visioLink = completeGrid.getString(GRID_VISIO_LINK);
        this.place = completeGrid.getString(GRID_PLACE);
        this.documentId = completeGrid.getString(GRID_DOCUMENT_ID);
        this.publicComment = completeGrid.getString(GRID_PUBLIC_COMMENT);
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
