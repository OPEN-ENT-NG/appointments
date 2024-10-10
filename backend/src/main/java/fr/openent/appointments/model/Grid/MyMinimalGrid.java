package fr.openent.appointments.model;

import io.vertx.core.json.JsonObject;

import java.util.Date;
import fr.openent.appointments.enums.GridState;
import fr.openent.appointments.helper.DateHelper;

public class MyMinimalGrid {
    private Integer gridId;
    private String gridName;
    private Date beginDate;
    private Date endDate;
    private GridState gridState;
    private String color;

    public MyMinimalGrid(JsonObject grid) {
        this.gridId = grid.getInteger("gridId");

        this.gridName = grid.getString("gridName");

        this.beginDate = DateHelper.parseDate(grid.getString("beginDate"));
        this.endDate = DateHelper.parseDate(grid.getString("endDate"));

        this.gridState = GridState.from(grid.getString("gridState"));
        this.color = grid.getString("color");
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
}
