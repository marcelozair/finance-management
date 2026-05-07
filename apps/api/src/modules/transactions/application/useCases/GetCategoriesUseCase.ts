import { CategoryRepository } from '../../domain/interfaces/CategoryRepository';
import { CategoryDto } from '../../presentation/dtos/CategoryDto';

export class GetCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<CategoryDto[]> {
    const categories = await this.categoryRepository.findAll();
    return categories.map((cat) => ({
      id: cat._id,
      name: cat._name,
      color: cat._color,
      iconName: cat._iconName,
      subCategories: cat._subCategories.map((sub) => ({
        id: sub._id,
        name: sub._name,
        iconName: sub._iconName,
      })),
    }));
  }
}
