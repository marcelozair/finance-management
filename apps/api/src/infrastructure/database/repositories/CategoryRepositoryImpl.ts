import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CategoryEntity } from '../entities/CategoryEntity';
import { CategoryRepository } from '../../../modules/transactions/domain/interfaces/CategoryRepository';
import { CategoryMapper } from '../../../modules/transactions/application/mappers/CategoryMapper';
import { Category } from '../../../modules/transactions/domain/entities/Category';

@Injectable()
export class CategoryRepositoryImpl implements CategoryRepository {
  @InjectRepository(CategoryEntity)
  private readonly repository: Repository<CategoryEntity>;

  async findAll(): Promise<Category[]> {
    const entities = await this.repository.find({
      relations: ['subCategories'],
    });

    return entities.map((entity) => CategoryMapper.entityToDomain(entity));
  }

  async findById(categoryId: number): Promise<Category | null> {
    const category = await this.repository.findOne({
      relations: ['subCategories'],
      where: { id: categoryId },
    });

    if (!category) return null;

    return CategoryMapper.entityToDomain(category);
  }
}
