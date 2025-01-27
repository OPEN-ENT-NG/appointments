package fr.openent.appointments.helper;

import io.vertx.core.http.HttpServerRequest;

import java.util.Optional;

import static fr.wseduc.webutils.http.Renders.badRequest;

public class ParamHelper {
    private ParamHelper() {
        throw new IllegalStateException("Utility class");
    }

    public static <T> T getParam(String key, HttpServerRequest request, Class<T> type, boolean required, String functionName) {
        T param;

        try {
            if (type == String.class) {
                param = type.cast(request.getParam(key));
            } else if (type == Integer.class) {
                param = type.cast(Optional.ofNullable(request.getParam(key))
                        .map(Integer::parseInt)
                        .orElse(null));
            } else if (type == Long.class) {
                param = type.cast(Optional.ofNullable(request.getParam(key))
                        .map(Long::parseLong)
                        .orElse(null));
            } else if (type == Boolean.class) {
                param = type.cast(Optional.ofNullable(request.getParam(key))
                        .map(Boolean::parseBoolean)
                        .orElse(false));
            } else {
                throw new IllegalArgumentException("Unsupported type: " + type.getName());
            }
        } catch (NumberFormatException e) {
            String errorMessage = String.format("Invalid format for parameter '%s' in function '%s'", key, functionName);
            LogHelper.logError(ParamHelper.class, functionName, errorMessage);
            badRequest(request);
            return null;
        }

        if (required && param == null) {
            String errorMessage = String.format("Parameter '%s' is required but missing or invalid in function '%s'", key, functionName);
            LogHelper.logError(ParamHelper.class, functionName, errorMessage);
            badRequest(request);
            return null;
        }

        return param;
    }

}
