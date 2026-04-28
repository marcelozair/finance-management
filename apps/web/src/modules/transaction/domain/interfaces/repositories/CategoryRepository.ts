import type { CategoryWihtSubCategoriesDto } from "../CategoryWithSubCategoryDto";

export interface CategoryRepository {
  getAll(): Promise<CategoryWihtSubCategoriesDto[]>;
}
