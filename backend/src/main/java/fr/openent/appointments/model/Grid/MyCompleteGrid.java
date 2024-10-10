package fr.openent.appointments.model;

import java.sql.Date;
import java.time.Duration;
import java.util.ArrayList;

import fr.openent.appointments.enums.GridState;

public class MyCompleteGrid extend MyMinimalGrid{
    private String structureId;
    private Duration duration;
    private Integer periodicity;
    private ArrayList<String> targetPublicIds;
    private String visioLink;
    private String place;
    private String documentId;
    private String publicComment;  

    public MyCompleteGrid(Integer gridId, String gridName, Date beginDate, Date endDate, GridState gridState, String color, String structureId, Duration duration, Integer periodicity, ArrayList<String> targetPublicIds, String visioLink, String place, String documentId, String publicComment) {
        super(gridId, gridName, beginDate, endDate, gridState, color);
        this.structureId = structureId;
        this.duration = duration;
        this.periodicity = periodicity;
        this.targetPublicIds = targetPublicIds;
        this.visioLink = visioLink;
        this.place = place;
        this.documentId = documentId;
        this.publicComment = publicComment;
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
