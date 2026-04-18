import { Amount } from "../../domain/vo/Amount";
import type { TransactionDTO } from "../../infrastructure/interfaces/TransactionRepositoryDtos";
import { Transaction } from "../../domain/entities/Transaction";
import { TransactionType } from "../../domain/vo/TransactionType";
import { TransactionCategory } from "../../domain/vo/TransactionCategory";

export class TransactionMapper {
  static toDomain(transaction: TransactionDTO): Transaction {
    return new Transaction(
      transaction.id,
      transaction.walletId,
      new Amount(transaction.amount),
      transaction.formattedAmount,
      transaction.concept,
      new TransactionType(transaction.type),
      new TransactionCategory(transaction.category),
      transaction.destinationWalletId,
    );
  }
}
