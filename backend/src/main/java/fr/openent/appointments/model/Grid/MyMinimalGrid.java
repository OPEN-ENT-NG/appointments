package fr.openent.appointments.model;

import java.sql.Date;
import fr.openent.appointments.enums.GridState;

public class MyMinimalGrid {
    private Integer gridId;
    private String gridName;
    private Date beginDate;
    private Date endDate;
    private GridState gridState;
    private String color;

    public MyMinimalGrid(Integer gridId, String gridName, Date beginDate, Date endDate, GridState gridState, String color) {
        this.gridId = gridId;
        this.gridName = gridName;
        this.beginDate = beginDate;
        this.endDate = endDate;
        this.gridState = gridState;
        this.color = color;
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
