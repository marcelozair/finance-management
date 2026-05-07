import { SubCategory } from "./SubCategory";

export class Category {
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly color: string,
    private readonly iconName: string,
    private readonly subCategories: SubCategory[] = [],
  ) {}

  get _id() {
    return this.id;
  }

  get _name() {
    return this.name;
  }

  get _color() {
    return this.color;
  }

  get _iconName() {
    return this.iconName;
  }

  get _subCategories() {
    return this.subCategories;
  }
}
