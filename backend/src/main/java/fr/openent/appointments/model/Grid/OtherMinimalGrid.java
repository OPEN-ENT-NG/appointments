package fr.openent.appointments.model;

import io.vertx.core.json.JsonObject;

public class OtherMinimalGrid {
    private Integer gridId;
    private String gridName;

    public OtherMinimalGrid(JsonObject minimalGrid) {
        this.gridId = minimalGrid.getInteger("gridId");
        this.gridName = minimalGrid.getString("gridName");
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
