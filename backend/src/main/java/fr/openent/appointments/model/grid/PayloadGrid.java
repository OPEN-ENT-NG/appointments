package fr.openent.appointments.model.grid;

import java.util.ArrayList;
import java.util.Date;
import java.time.Duration;

import fr.openent.appointments.core.constants.SqlColumns;
import fr.openent.appointments.enums.GridState;
import fr.openent.appointments.enums.Periodicity;
import fr.openent.appointments.helper.DateHelper;

import io.vertx.core.json.JsonObject;

public class PayloadGrid {

    private String gridName;
    private Date beginDate;
    private Date endDate;
    private GridState gridState;
    private String color;
    private String structureId;
    private Duration duration;
    private Periodicity periodicity;
    private ArrayList<String> targetPublicIds;
    private String visioLink;
    private String place;
    private String documentId;
    private String publicComment;

    public PayloadGrid(JsonObject payloadGrid){
        this.gridName = payloadGrid.getString(GRID_NAME, "");

        this.beginDate = DateHelper.parseDate(payloadGrid.getString(GRID_BEGIN_DATE, ""));
        this.endDate = DateHelper.parseDate(payloadGrid.getString(GRID_END_DATE, ""));

        this.gridState = GridState.from(payloadGrid.getString(GRID_STATE, ""));

        this.color = payloadGrid.getString(GRID_COLOR);
        this.structureId = payloadGrid.getString(GRID_STRUCTURE_ID,"");

        this.duration = DateHelper.parseDuration(payloadGrid.getString(GRID_DURATION,""));

        this.periodicity = Periodicity.from(payloadGrid.getInteger(GRID_PERIODICITY,""));

        this.targetPublicIds = new ArrayList<>();
        payloadGrid.getJsonArray(GRID_TARGET_PUBLIC_LIST_ID).forEach(targetPublicId -> {
            this.targetPublicIds.add(targetPublicId.toString());
        });

        this.visioLink = payloadGrid.getString(GRID_VISIO_LINK);
        this.place = payloadGrid.getString(GRID_PLACE);
        this.documentId = payloadGrid.getString(GRID_DOCUMENT_ID);
        this.publicComment = payloadGrid.getString(GRID_PUBLIC_COMMENT);
    }

    public boolean isComplete() {
        return this.structureId != null && this.duration != null && this.periodicity != null && this.targetPublicIds != null && this.visioLink != null && this.place != null && this.documentId != null && this.publicComment != null;
    }

    // getters and setters
    public String getGridName() {
        return gridName;
    }

    public void setGridName(String gridName) {
        this.gridName = gridName;
    }

    public Date getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(Date beginDate) {
        this.beginDate = beginDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public GridState getGridState() {
        return gridState;
    }

    public void setGridState(GridState gridState) {
        this.gridState = gridState;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
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

    public Periodicity getPeriodicity() {
        return periodicity;
    }

    public void setPeriodicity(Periodicity periodicity) {
        this.periodicity = periodicity;
    }

    public ArrayList<String> getTargetPublicIds() {
        return targetPublicIds;
    }

    public void setTargetPublicIds(ArrayList<String> targetPublicIds) {
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
