import type {
  CategoryDto,
  SubCategoryDto,
} from "../../domain/interfaces/CategoryWithSubCategoryDto";

import { StringDate } from "@core/domain/vo/StringDate";
import { Category } from "../../domain/entities/Category";
import { Amount } from "../../../../core/domain/vo/Amount";
import { Transaction } from "../../domain/entities/Transaction";
import { SubCategory } from "../../domain/entities/SubCategory";
import { TransactionType } from "../../domain/vo/TransactionType";
import type { TransactionDTO } from "../../infrastructure/interfaces/ResponseGetAllTransactionsDto";

class CategoryMapper {
  static dtoToDomain(category: CategoryDto | null) {
    if (!category) return null;

    return new Category(
      category.id,
      category.name,
      category.color,
      category.iconName,
    );
  }
}

class SubCategoryMapper {
  static dtoToDomain(category: SubCategoryDto | null) {
    if (!category) return null;

    return new SubCategory(category.id, category.name, category.iconName);
  }
}

export class TransactionMapper {
  static toDomain(transaction: TransactionDTO): Transaction {
    return new Transaction(
      transaction.id,
      transaction.walletId,
      new Amount(transaction.amount),
      transaction.concept,
      new StringDate(transaction.date),
      new TransactionType(transaction.type),
      CategoryMapper.dtoToDomain(transaction.category),
      SubCategoryMapper.dtoToDomain(transaction.subCategory),
      transaction.destinationWalletId,
    );
  }
}
