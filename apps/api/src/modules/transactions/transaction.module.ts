import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesController } from './presentation/CategoriesController';
import { CategoryRepository } from './domain/interfaces/CategoryRepository';
import { TransactionController } from './presentation/TransactionController';
import { TransactionRepository } from './domain/interfaces/TransactionRepository';
import { GetCategoriesUseCase } from './application/useCases/GetCategoriesUseCase';
import { CategoryEntity } from 'src/infrastructure/database/entities/CategoryEntity';
import { GetTransactionsUseCase } from './application/useCases/GetTransactionsUseCase';
import { TransactionEntity } from 'src/infrastructure/database/entities/TransactionEntity';
import { CreateTransactionUseCase } from './application/useCases/CreateTransactionUseCase';
import { SubCategoryEntity } from 'src/infrastructure/database/entities/SubCategoryEntity';
import { CategoryRepositoryImpl } from 'src/infrastructure/database/repositories/CategoryRepositoryImpl';
import { TransactionRepositoryImpl } from 'src/infrastructure/database/repositories/TransactionRepositoryImpl';

@Module({
  controllers: [TransactionController, CategoriesController],
  imports: [
    TypeOrmModule.forFeature([
      TransactionEntity,
      CategoryEntity,
      SubCategoryEntity,
    ]),
  ],
  providers: [
    {
      provide: TransactionRepository,
      useClass: TransactionRepositoryImpl,
    },
    {
      provide: CategoryRepository,
      useClass: CategoryRepositoryImpl,
    },
    {
      provide: CreateTransactionUseCase,
      useFactory: (
        transactionRepo: TransactionRepository,
        categoryRepo: CategoryRepository,
      ) => {
        return new CreateTransactionUseCase(transactionRepo, categoryRepo);
      },
      inject: [TransactionRepository, CategoryRepository],
    },
    {
      provide: GetTransactionsUseCase,
      useFactory: (transactionRepo: TransactionRepository) => {
        return new GetTransactionsUseCase(transactionRepo);
      },
      inject: [TransactionRepository],
    },
    {
      provide: GetCategoriesUseCase,
      useFactory: (categoryRepo: CategoryRepository) => {
        return new GetCategoriesUseCase(categoryRepo);
      },
      inject: [CategoryRepository],
    },
  ],
  exports: [TransactionRepository],
})
export class TransactionModule {}
