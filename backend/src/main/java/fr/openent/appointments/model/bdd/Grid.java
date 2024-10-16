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

    
}
