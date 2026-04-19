import { Amount } from '../../../wallets/domain/vo/Amount';
import { Category } from '../../domain/entities/Category';
import { SubCategory } from '../../domain/entities/SubCategory';
import { Transaction } from '../../domain/entities/Transaction';
import { TransactionType } from '../../domain/vo/TransactionType';
import { TransactionEntity } from 'src/infrastructure/database/entities/TransactionEntity';
import { TransactionDTO } from '../../presentation/dtos/TransactionDto';

export class TransactionMapper {
  static entityToDomain(entity: TransactionEntity): Transaction {
    return new Transaction(
      entity.id,
      entity.walletId,
      new Amount(Number(entity.amount)), // Ensuring decimal from DB is a Number
      entity.concept,
      new TransactionType(entity.type as any),
      entity.categoryId,
      entity.subCategoryId,
      entity.destinationWalletId,
      entity.category
        ? new Category(
            entity.category.id,
            entity.category.name,
            entity.category.color,
            entity.category.iconName,
          )
        : undefined,
      entity.subCategory
        ? new SubCategory(
            entity.subCategory.id,
            entity.subCategory.name,
            entity.subCategory.iconName,
          )
        : undefined,
    );
  }

  static toDto(entity: Transaction): TransactionDTO {
    return {
      id: entity._id,
      type: entity._type.getValue(),
      amount: entity._amount.getValue(),
      concept: entity._concept,
      walletId: entity._walletId,
      category: entity._category
        ? {
            id: entity._category._id,
            name: entity._category._name,
            color: entity._category._color,
            iconName: entity._category._iconName,
          }
        : null,
      subCategory: entity._subCategory
        ? {
            id: entity._subCategory._id,
            name: entity._subCategory._name,
            iconName: entity._subCategory._iconName,
          }
        : null,
      destinationWalletId: entity._destinationWalletId,
    };
  }
}
