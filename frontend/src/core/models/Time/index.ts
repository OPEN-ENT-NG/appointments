import dayjs, { Dayjs } from "dayjs";

export class Time {
  hour: number;
  minute: number;

  constructor(hour: number, minute: number) {
    this.hour = hour;
    this.minute = minute;
  }

  public parseToString(): string {
    return `${this.hour.toString().padStart(2, "0")}:${this.minute
      .toString()
      .padStart(2, "0")}`;
  }

  public parseToDayjs(): Dayjs {
    return dayjs()
      .set("hour", this.hour)
      .set("minute", this.minute)
      .startOf("minute");
  }
}
