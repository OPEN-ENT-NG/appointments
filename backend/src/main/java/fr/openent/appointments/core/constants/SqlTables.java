package fr.openent.appointments.core.constants;

public class SqlTables {
    
    public static final String DB_SCHEMA = "appointments";

    // Table names
    public static final String GRID_TABLE = "grid";
    public static final String GRID_STATE_TABLE = "grid_state";
    public static final String DAILY_SLOT_TABLE = "daily_slot";
    public static final String TIME_SLOT_TABLE = "time_slot";
    public static final String APPOINTMENT_TABLE = "appointment";
    public static final String GRID_SHARES_TABLE = "grid_shares";
    public static final String GROUPS_TABLE = "groups";
    public static final String MEMBERS_TABLE = "members";
    public static final String USERS_TABLE = "users";

    // Table full DB names
    public static final String DB_GRID_TABLE = DB_SCHEMA + ".grid";
    public static final String DB_GRID_STATE_TABLE = DB_SCHEMA + ".grid_state";
    public static final String DB_DAILY_SLOT_TABLE = DB_SCHEMA + ".daily_slot";
    public static final String DB_TIME_SLOT_TABLE = DB_SCHEMA + ".time_slot";
    public static final String DB_APPOINTMENT_TABLE = DB_SCHEMA + ".appointment";
    public static final String DB_GRID_SHARES_TABLE = DB_SCHEMA + ".grid_shares";
    public static final String DB_GROUPS_TABLE = DB_SCHEMA + ".groups";
    public static final String DB_MEMBERS_TABLE = DB_SCHEMA + ".members";
    public static final String DB_USERS_TABLE = DB_SCHEMA + ".users";

    private SqlTables() {
        throw new IllegalStateException("Utility class");
    }
}
