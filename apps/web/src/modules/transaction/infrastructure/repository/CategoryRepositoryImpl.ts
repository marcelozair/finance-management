import { ApiService } from "../../../../core/services/ApiService";
import type { APIClient } from "src/infrastructure/config/APIClient";
import type { FailureHandler } from "src/core/services/FailureHandler";
import type { CategoryRepository } from "../../domain/interfaces/repositories/CategoryRepository";
import type { CategoryWihtSubCategoriesDto } from "../../domain/interfaces/CategoryWithSubCategoryDto";

export class CategoryRepositoryImpl
  extends ApiService
  implements CategoryRepository
{
  constructor(APIClient: APIClient, failureHandler: FailureHandler) {
    super(APIClient, failureHandler);
  }

  async getAll(): Promise<CategoryWihtSubCategoriesDto[]> {
    const response =
      await this.get<CategoryWihtSubCategoriesDto[]>("categories");
    return response.data;
  }
}
