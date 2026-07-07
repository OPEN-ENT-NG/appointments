package fr.openent.appointments.model.response;

import fr.openent.appointments.model.database.Grid;
import io.vertx.core.json.JsonObject;

import static fr.openent.appointments.core.constants.Fields.*;

public abstract class BaseMinimalGrid {
    private Long id;
    private String name;
    private String color;

    // Constructor

    public BaseMinimalGrid(JsonObject grid) {
        this.id = grid.getLong(ID, null);
        this.name = grid.getString(NAME, null);
        this.color = grid.getString(COLOR, null);
    }

    public BaseMinimalGrid(Grid grid) {
        this.id = grid.getId();
        this.name = grid.getName();
        this.color = grid.getColor();
    }

    // Getter

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getColor() {
        return color;
    }

    // Setter

    public BaseMinimalGrid setId(Long id) {
        this.id = id;
        return this;
    }

    public BaseMinimalGrid setName(String name) {
        this.name = name;
        return this;
    }

    public BaseMinimalGrid setColor(String color) {
        this.color = color;
        return this;
    }
}
