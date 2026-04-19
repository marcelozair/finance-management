import { CategoryEntity } from 'src/infrastructure/database/entities/CategoryEntity';
import { Category } from '../../domain/entities/Category';
import { SubCategory } from '../../domain/entities/SubCategory';

export class CategoryMapper {
  static entityToDomain(entity: CategoryEntity): Category {
    return new Category(
      entity.id,
      entity.name,
      entity.color,
      entity.iconName,
      entity.subCategories?.map(
        (sub) => new SubCategory(sub.id, sub.name, sub.iconName),
      ) || [],
    );
  }
}
