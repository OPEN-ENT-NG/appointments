package fr.openent.appointments.core.constants;

public class ShareRights {
    public static final String BOOK_RESOURCE_RIGHT = "appointments.read";
    public static final String MANAGER_RESOURCE_RIGHT = "appointments.manager";

    public static final String BOOK_RESOURCE_BEHAVIOUR = "fr-openent-appointments-controller-MainController|initBookResourceRight";
    public static final String MANAGER_RESOURCE_BEHAVIOUR = "fr-openent-appointments-controller-MainController|initManagerResourceRight";

    private ShareRights() {
        throw new IllegalStateException("Utility class");
    }
}

