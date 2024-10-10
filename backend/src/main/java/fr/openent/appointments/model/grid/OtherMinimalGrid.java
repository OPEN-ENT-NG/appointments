package fr.openent.appointments.model.grid;

import io.vertx.core.json.JsonObject;
import fr.openent.appointments.core.constants.SqlColumns;

public class OtherMinimalGrid {
    private Integer gridId;
    private String gridName;

    public OtherMinimalGrid(JsonObject minimalGrid) {
        this.gridId = minimalGrid.getInteger(ID);
        this.gridName = minimalGrid.getString(GRID_NAME);
    }

    public Integer getGridId() {
        return gridId;
    }

    public void setGridId(Integer gridId) {
        this.gridId = gridId;
    }

    public String getGridName() {
        return gridName;
    }

    public void setGridName(String gridName) {
        this.gridName = gridName;
    }

}
