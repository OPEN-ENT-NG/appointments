package fr.openent.appointments.model.bdd;

import java.util.stream.Collectors;
import java.util.List;
import java.time.LocalDate;
import java.time.Duration;

import fr.openent.appointments.core.constants.Fields;
import fr.openent.appointments.enums.Periodicity;
import fr.openent.appointments.helper.DateHelper;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;

public class Grid {

    private String gridName;
    private LocalDate beginDate;
    private LocalDate endDate;
    private String color;
    private String structureId;
    private Duration duration;
    private Periodicity periodicity;
    private List<String> targetPublicIds;
    private String visioLink;
    private String place;
    private String documentId;
    private String publicComment;

    public Grid(JsonObject grid){
        this.gridName = grid.getString(Fields.NAME, "");

        this.beginDate = DateHelper.parseDate(grid.getString(Fields.BEGIN_DATE, ""));
        this.endDate = DateHelper.parseDate(grid.getString(Fields.END_DATE, ""));

        this.color = grid.getString(Fields.COLOR);
        this.structureId = grid.getString(Fields.STRUCTURE_ID,"");

        this.duration = DateHelper.parseDuration(grid.getString(Fields.DURATION,""));

        this.periodicity = Periodicity.from(grid.getInteger(Fields.PERIODICITY,0));

        this.targetPublicIds = grid
            .getJsonArray(Fields.TARGET_PUBLIC_LIST_ID, new JsonArray())
            .stream()
            .map(Object::toString)
            .collect(Collectors.toList());

        this.visioLink = grid.getString(Fields.VISIO_LINK);
        this.place = grid.getString(Fields.PLACE);
        this.documentId = grid.getString(Fields.DOCUMENT_ID);
        this.publicComment = grid.getString(Fields.PUBLIC_COMMENT);
    }

    public String getGridName() {
        return gridName;
    }

    public LocalDate getBeginDate() {
        return beginDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public String getColor() {
        return color;
    }

    public String getStructureId() {
        return structureId;
    }

    public Duration getDuration() {
        return duration;
    }

    public Periodicity getPeriodicity() {
        return periodicity;
    }

    public List<String> getTargetPublicIds() {
        return targetPublicIds;
    }

    public String getVisioLink() {
        return visioLink;
    }

    public String getPlace() {
        return place;
    }

    public String getDocumentId() {
        return documentId;
    }

    public String getPublicComment() {
        return publicComment;
    }

    // setters

    public void setGridName(String gridName) {
        this.gridName = gridName;
    }

    public void setBeginDate(LocalDate beginDate) {
        this.beginDate = beginDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public void setColor(String color) {
        this.color = color;
    }   

    public void setStructureId(String structureId) {
        this.structureId = structureId;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public void setPeriodicity(Periodicity periodicity) {
        this.periodicity = periodicity;
    }

    public void setTargetPublicIds(List<String> targetPublicIds) {
        this.targetPublicIds = targetPublicIds;
    }

    public void setVisioLink(String visioLink) {
        this.visioLink = visioLink;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }

    public void setPublicComment(String publicComment) {
        this.publicComment = publicComment;
    }    
}
