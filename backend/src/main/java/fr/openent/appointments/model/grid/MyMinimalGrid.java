package fr.openent.appointments.model.grid;

import io.vertx.core.json.JsonObject;

import java.util.Date;
import fr.openent.appointments.enums.GridState;
import fr.openent.appointments.helper.DateHelper;
import fr.openent.appointments.core.constants.SqlColumns;

public class MyMinimalGrid {
    private Integer gridId;
    private String gridName;
    private Date beginDate;
    private Date endDate;
    private GridState gridState;
    private String color;

    public MyMinimalGrid(JsonObject grid) {
        this.gridId = grid.getInteger(ID);

        this.gridName = grid.getString(GRID_NAME);

        this.beginDate = DateHelper.parseDate(grid.getString(GRID_BEGIN_DATE));
        this.endDate = DateHelper.parseDate(grid.getString(GRID_END_DATE));

        this.gridState = GridState.from(grid.getString(GRID_STATE));
        this.color = grid.getString(GRID_COLOR);
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
