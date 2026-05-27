package fr.openent.appointments.enums;

import java.util.Arrays;

import static fr.openent.appointments.core.constants.ShareRights.*;

public enum ShareRight {
  BOOK(BOOK_RESOURCE_RIGHT, BOOK_RESOURCE_BEHAVIOUR),
  MANAGER(MANAGER_RESOURCE_RIGHT, MANAGER_RESOURCE_BEHAVIOUR);


  private final String value;
  private final String action;

  ShareRight(String value, String action) {
    this.value = value;
    this.action = action;
  }

  public String getValue() {
    return this.value;
  }

  public String getAction() {
    return this.action;
  }

  public static ShareRight getShareRightByValue(String value) {
     return Arrays.stream(ShareRight.values())
             .filter(actions -> actions.getValue().equals(value))
             .findFirst()
             .orElse(null);
  }

  public static ShareRight getShareRightByAction(String action) {
     return Arrays.stream(ShareRight.values())
             .filter(actions -> actions.getAction().equals(action))
             .findFirst()
             .orElse(null);
  }
}