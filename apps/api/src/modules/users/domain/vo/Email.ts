import { ValueObject } from 'src/core/domain/ValueObject';

export class Email extends ValueObject<string> {
  constructor(value: string) {
    super(value);

    if (!Email.isValid(value)) {
      throw new Error('Invalid email format');
    }
  }

  private static isValid(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
}
