export class CategoryNotFoundError extends Error {
  constructor() {
    super('Category not found, please try again');
  }
}

export class SubCategoryNotFoundError extends Error {
  constructor() {
    super('Sub-category not found, please try again');
  }
}
