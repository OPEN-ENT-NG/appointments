package fr.openent.appointments.model;

public class OtherMinimalGrid {
    private Integer gridId;
    private String gridName;

    public OtherMinimalGrid(gridId, gridName) {
        this.gridId = gridId;
        this.gridName = gridName;
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
