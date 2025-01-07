package fr.openent.appointments.model.response;

import fr.openent.appointments.helper.IModelHelper;
import fr.openent.appointments.model.IModel;
import io.vertx.core.json.JsonObject;

import java.time.LocalDate;
import java.util.List;

public class DateListResponse implements IModel<DateListResponse> {
    private List<LocalDate> dates;

    public DateListResponse(List<LocalDate> dates) {
        this.dates = dates;
    }

    public List<LocalDate> getDates() {
        return dates;
    }

    public DateListResponse setDates(List<LocalDate> dates) {
        this.dates = dates;
        return this;
    }

    @Override
    public JsonObject toJson() {
        return IModelHelper.toJson(this, false, false);
    }
}
