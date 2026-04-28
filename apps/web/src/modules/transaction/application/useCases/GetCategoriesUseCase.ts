import type { CategoryRepository } from "../../domain/interfaces/repositories/CategoryRepository";
import type { CategoryWihtSubCategoriesDto } from "../../domain/interfaces/CategoryWithSubCategoryDto";

export class GetCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<CategoryWihtSubCategoriesDto[]> {
    return this.categoryRepository.getAll();
  }
}
