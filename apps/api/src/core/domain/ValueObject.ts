export abstract class ValueObject<T> {
  protected readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  equals(vo?: ValueObject<T>): boolean {
    if (!vo) return false;

    return JSON.stringify(this.value) === JSON.stringify(vo.value);
  }
}
