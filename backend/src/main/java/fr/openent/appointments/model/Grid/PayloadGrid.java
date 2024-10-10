import java.util.ArrayList;
import java.util.Date;
import java.time.Duration;

import fr.openent.appointments.enums.GridState;
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
    private Integer periodicity;
    private ArrayList<String> targetPublicIds;
    private String visioLink;
    private String place;
    private String documentId;
    private String publicComment;

    public PayloadGrid(JsonObject payloadGrid){
        this.gridName = payloadGrid.getString("gridName");

        this.beginDate = DateHelper.parseDate(payloadGrid.getString("beginDate"));
        this.endDate = DateHelper.parseDate(payloadGrid.getString("endDate"));

        this.gridState = GridState.from(payloadGrid.getString("gridState"));

        this.color = payloadGrid.getString("color");
        this.structureId = payloadGrid.getString("structureId");

        this.duration = DateHelper.parseDuration(payloadGrid.getString("duration"));

        this.periodicity = payloadGrid.getInteger("periodicity");

        this.targetPublicIds = new ArrayList<>();
        payloadGrid.getJsonArray("targetPublicIds").forEach(targetPublicId -> {
            this.targetPublicIds.add(targetPublicId.toString());
        });

        this.visioLink = payloadGrid.getString("visioLink");
        this.place = payloadGrid.getString("place");
        this.documentId = payloadGrid.getString("documentId");
        this.publicComment = payloadGrid.getString("publicComment");
    }

    // Getters et Setters
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

    public Integer getPeriodicity() {
        return periodicity;
    }

    public void setPeriodicity(Integer periodicity) {
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
