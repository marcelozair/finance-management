export class SubCategory {
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly iconName: string,
  ) {}

  get _id() {
    return this.id;
  }

  get _name() {
    return this.name;
  }

  get _iconName() {
    return this.iconName;
  }
}
