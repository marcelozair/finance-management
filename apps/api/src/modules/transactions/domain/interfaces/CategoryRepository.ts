import { Category } from '../entities/Category';

export abstract class CategoryRepository {
  abstract findAll(): Promise<Category[]>;
  abstract findById(categoryId: number): Promise<Category | null>;
}
