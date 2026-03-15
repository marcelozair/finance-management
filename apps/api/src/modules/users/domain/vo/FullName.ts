import { ValueObject } from 'src/core/domain/ValueObject';

export class FullName extends ValueObject<string> {
  constructor(value: string) {
    super(value);

    if (!FullName.isValid(value)) {
      throw new Error('Invalid name format');
    }
  }

  private static isValid(name: string): boolean {
    const regex = /^[a-zA-Z]+( [a-zA-Z]+)+$/;
    return regex.test(name);
  }
}
