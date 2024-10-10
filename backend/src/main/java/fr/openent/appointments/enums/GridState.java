public enum GridState {
    OPEN("OPEN"),
    SUSPENDED("SUSPENDED"),
    CLOSED("CLOSED");

    private final String value;

    GridState(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static GridState from(String value) {
        for (GridState type : values()) {
            if (type.value.equals(value)) {
                return type;
            }
        }
        return null;
    }
}
