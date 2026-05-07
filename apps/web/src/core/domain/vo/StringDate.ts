import { ValueObject } from "./ValueObject";

export class StringDate extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.validate(value);
  }

  private validate(value: string) {
    // Basic ISO-like validation (YYYY-MM-DD or full ISO)
    const date = new Date(value);

    if (!value || isNaN(date.getTime())) {
      throw new Error("Invalid date string");
    }
  }

  toDate(): Date {
    return new Date(this.value);
  }

  toISOString(): string {
    return new Date(this.value).toISOString();
  }

  getTimestamp(): number {
    return new Date(this.value).getTime();
  }
}
