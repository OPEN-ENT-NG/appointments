package fr.openent.appointments.model;

import io.vertx.core.json.JsonObject;

import fr.openent.appointments.enums.GridState;
import fr.openent.appointments.helper.DateHelper;

import java.time.Duration;

public class OtherCompleteGrid extends OtherMinimalGrid {
    private String visioLink;
    private String place;
    private String documentId;
    private String publicComment;
    private Duration duration;   

    public OtherCompleteGrid(JsonObject completeGrid){
        super(completeGrid);
        this.visioLink = completeGrid.getString("visioLink");
        this.place = completeGrid.getString("place");
        this.documentId = completeGrid.getString("documentId");
        this.publicComment = completeGrid.getString("publicComment");
        this.duration = DateHelper.parseDuration(completeGrid.getString("duration"));
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

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    } 
}
