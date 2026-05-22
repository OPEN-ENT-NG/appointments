package fr.openent.appointments.helper;

import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;

import static fr.openent.appointments.core.constants.Constants.APPOINTMENTS;


public class LogHelper {

    private LogHelper() {}

    public static Logger getLogger(Class<?> myClass) {
        return LoggerFactory.getLogger(myClass);
    }

    public static String getBaseLog(Class<?> myClass, String methodName) {
        return String.format("[%s@%s::%s]", APPOINTMENTS, myClass.getSimpleName(), methodName);
    }

    public static String constructLogMessage(Object classObject, String methodName, String message) {
        Class<?> myClass = classObject.getClass();
        return constructLogMessage(myClass, methodName, message, null);
    }

    public static String constructLogMessage(Class<?> myClass, String methodName, String message) {
        return constructLogMessage(myClass, methodName, message, null);
    }

    public static String constructLogMessage(Class<?> myClass, String methodName, String message, String err) {
        return err != null && !err.isEmpty()
                ? String.format("%s %s : %s", getBaseLog(myClass, methodName), message, err)
                : String.format("%s %s", getBaseLog(myClass, methodName), message);
    }

    public static void logError(Object classObject, String methodName, String message) {
        Class<?> myClass = classObject.getClass();
        getLogger(myClass).error(constructLogMessage(myClass, methodName, message));
    }

    public static void logError(Object classObject, String methodName, String message, String err) {
        Class<?> myClass = classObject.getClass();
        getLogger(myClass).error(constructLogMessage(myClass, methodName, message, err));
    }

    public static void logInfo(Object classObject, String methodName, Object object) {
        logInfo(classObject, methodName, object.toString());
    }

    public static void logInfo(Object classObject, String methodName, String message) {
        Class<?> myClass = classObject.getClass();
        getLogger(myClass).info(constructLogMessage(myClass, methodName, message));
    }
}
