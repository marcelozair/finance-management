export class TOTPSecret {
  value: string;
  path: string;

  constructor(value: string, path: string) {
    this.value = value;
    this.path = path;
  }
}
