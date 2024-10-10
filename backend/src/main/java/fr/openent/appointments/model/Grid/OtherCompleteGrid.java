package fr.openent.appointments.model;

import fr.openent.appointments.enums.GridState;
import java.time.Duration;

public class OtherCompleteGrid extend OtherMinimalGrid {
    private String visioLink;
    private String place;
    private String documentId;
    private String publicComment;
    private Duration duration;   

    public OtherCompleteGrid(Integer gridId, String gridName, String visioLink, String place, String documentId, String publicComment, Duration duration) {
        super(gridId, gridName);
        this.visioLink = visioLink;
        this.place = place;
        this.documentId = documentId;
        this.publicComment = publicComment;
        this.duration = duration;
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
