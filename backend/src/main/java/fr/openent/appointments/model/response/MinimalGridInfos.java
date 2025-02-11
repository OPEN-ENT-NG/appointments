package fr.openent.appointments.model.response;

import fr.openent.appointments.helper.DateHelper;
import fr.openent.appointments.helper.IModelHelper;
import fr.openent.appointments.model.IModel;
import fr.openent.appointments.model.database.Grid;
import io.vertx.core.json.JsonObject;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;
import static fr.openent.appointments.core.constants.Fields.*;

public class MinimalGridInfos extends BaseMinimalGrid implements IModel<MinimalGridInfos> {
    private Duration duration;
    private String videoCallLink;
    private String place;
    private List<String> documentsIds;
    private String publicComment;

    // Constructor

    public MinimalGridInfos(JsonObject grid) {
        super(grid);
        this.duration = DateHelper.parseDuration(grid.getString(DURATION,null));
        this.videoCallLink = grid.getString(VIDEO_CALL_LINK, null);
        this.place = grid.getString(PLACE, null);
        this.documentsIds = grid.getJsonArray(DOCUMENTS_IDS).stream().map(Object::toString).collect(Collectors.toList());
        this.publicComment = grid.getString(PUBLIC_COMMENT, null);
    }

    public MinimalGridInfos(Grid grid) {
        super(grid);
        this.setDuration(grid.getDuration());
        this.setVideoCallLink(grid.getVideoCallLink());
        this.setPlace(grid.getPlace());
        this.setDocumentsIds(grid.getDocumentsIds());
        this.setPublicComment(grid.getPublicComment());
    }

    // Getter

    public Duration getDuration() {
        return duration;
    }

    public String getVideoCallLink() {
        return videoCallLink;
    }

    public String getPlace() {
        return place;
    }

    public List<String> getDocumentsIds() {
        return documentsIds;
    }

    public String getPublicComment() {
        return publicComment;
    }

    // Setter

    public MinimalGridInfos setDuration(Duration duration) {
        this.duration = duration;
        return this;
    }

    public MinimalGridInfos setVideoCallLink(String videoCallLink) {
        this.videoCallLink = videoCallLink;
        return this;
    }

    public MinimalGridInfos setPlace(String place) {
        this.place = place;
        return this;
    }

    public MinimalGridInfos setDocumentsIds(List<String> documentsIds) {
        this.documentsIds = documentsIds;
        return this;
    }

    public MinimalGridInfos setPublicComment(String publicComment) {
        this.publicComment = publicComment;
        return this;
    }

    // Functions

    public JsonObject toJson() {
        return IModelHelper.toJson(this, false, false);
    }
}
