package fr.openent.appointments.model.database;

import fr.openent.appointments.helper.IModelHelper;
import fr.openent.appointments.model.IModel;
import io.vertx.core.json.JsonObject;

import static fr.openent.appointments.core.constants.Fields.ID;
import static fr.openent.appointments.core.constants.Fields.NAME;

public class NeoStructure implements IModel<NeoStructure> {
    private String id;
    private String name;

    public NeoStructure(JsonObject structure) {
        this.id = structure.getString(ID, null);
        this.name = structure.getString(NAME, null);
    }

    public NeoStructure(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public NeoStructure setId(String id) {
        this.id = id;
        return this;
    }

    public NeoStructure setName(String name) {
        this.name = name;
        return this;
    }

    public JsonObject toJson() {
        return IModelHelper.toJson(this, false, false);
    }
}
