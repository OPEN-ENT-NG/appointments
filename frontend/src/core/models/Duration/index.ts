import { DURATION } from "./enums";

export class Duration {
  private duration: DURATION;

  constructor(duration: DURATION) {
    this.duration = duration;
  }

  public getDuration(): DURATION {
    return this.duration;
  }

  public getDisplayValue(): string {
    switch (this.duration) {
      case DURATION.FIFTEEN_MINUTES:
        return "15 min";
      case DURATION.THIRTY_MINUTES:
        return "30 min";
      case DURATION.FOURTYFIVE_MINUTES:
        return "45 min";
      case DURATION.ONE_HOUR:
        return "1 h";
      default:
        return "15 min";
    }
  }

  public getNumberOfMinutes(): number {
    switch (this.duration) {
      case DURATION.FIFTEEN_MINUTES:
        return 15;
      case DURATION.THIRTY_MINUTES:
        return 30;
      case DURATION.FOURTYFIVE_MINUTES:
        return 45;
      case DURATION.ONE_HOUR:
        return 60;
      default:
        return 15;
    }
  }
}
