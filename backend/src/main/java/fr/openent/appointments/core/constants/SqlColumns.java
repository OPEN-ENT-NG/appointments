package fr.openent.appointments.core.constants;

public class SqlColumns {
    // Common SQL columns
    public static final String ID = "id";

    // Grid Table Columns
    public static final String GRID_NAME = "name";
    public static final String GRID_OWNER_ID = "owner_id";
    public static final String GRID_STRUCTURE_ID = "structure_id";
    public static final String GRID_BEGIN_DATE = "begin";
    public static final String GRID_END_DATE = "end";
    public static final String GRID_COLOR = GRID_COLOR;
    public static final String GRID_DURATION = GRID_DURATION;
    public static final String GRID_PERIODICITY = GRID_PERIODICITY;
    public static final String GRID_TARGET_PUBLIC_LIST_ID = "target_public_list_id";
    public static final String GRID_VISIO_LINK = "visio_link";
    public static final String GRID_PLACE = GRID_PLACE;
    public static final String GRID_DOCUMENT_ID = "document_id";
    public static final String GRID_PUBLIC_COMMENT = "public_comment";
    public static final String GRID_STATE = "state";

    // Grid State Table Columns
    public static final String GRID_STATE_STATE = "state";
    public static final String GRID_STATE_GRID_ID = "grid_id";
    public static final String GRID_STATE_DATE = "date";

    // Daily Slot Table Columns
    public static final String DAILY_SLOT_DAY = "day";
    public static final String DAILY_SLOT_BEGIN_TIME = "begin";
    public static final String DAILY_SLOT_END_TIME = "end";
    public static final String DAILY_SLOT_GRID_ID = "grid_id";

    // Time Slot Table Columns
    public static final String TIME_SLOT_BEGIN_TIMESTAMP = "begin";
    public static final String TIME_SLOT_END_TIMESTAMP = "end";
    public static final String TIME_SLOT_GRID_ID = "grid_id";

    // Appointment Table Columns
    public static final String APPOINTMENT_REQUESTER_ID = "requester_id";
    public static final String APPOINTMENT_TIME_SLOT_ID = "time_slot_id";
    public static final String APPOINTMENT_STATE = "state";

    // Appointment State Table Columns
    public static final String APPOINTMENT_STATE_APPOINTMENT_ID = "appointment_id";
    public static final String APPOINTMENT_STATE_STATE = "state";
    public static final String APPOINTMENT_STATE_ACTOR_ID = "actor_id";
    public static final String APPOINTMENT_STATE_DATE = "date";
}
