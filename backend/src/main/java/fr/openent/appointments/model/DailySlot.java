package fr.openent.appointments.model;

import fr.openent.appointments.enums.Day;
import fr.openent.appointments.core.constants.Fields;
import fr.openent.appointments.helper.DateHelper;

import java.time.LocalTime;
import io.vertx.core.json.JsonObject;

public class DailySlot {
    
    private Day day;
    private LocalTime beginTime;
    private LocalTime endTime;

    public DailySlot(JsonObject dailySlot){
        this.day = Day.from(dailySlot.getString(Fields.DAY, ""));
        this.beginTime = LocalTime.parse(dailySlot.getString(Fields.CAMEL_BEGIN_TIME, ""));
        this.endTime = LocalTime.parse(dailySlot.getString(Fields.CAMEL_END_TIME, ""));
    }

    public boolean isValid() {
        return  this.day != null && 
                this.beginTime != null && 
                this.endTime != null &&
                this.beginTime.isBefore(this.endTime);
    }

    public Day getDay() {
        return day;
    }

    public LocalTime getBeginTime() {
        return beginTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public String toString() {
        return "DailySlot{" +
                "day=" + day +
                ", beginTime=" + beginTime +
                ", endTime=" + endTime +
                '}';
    }
}
