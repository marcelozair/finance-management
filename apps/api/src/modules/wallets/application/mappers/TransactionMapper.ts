import { Amount } from '../../domain/vo/Amount';
import { Transaction } from '../../domain/entities/Transaction';
import { TransactionType } from '../../domain/vo/TransactionType';
import { TransactionCategory } from '../../domain/vo/TransactionCategory';
import { TransactionEntity } from 'src/shared/infrastructure/database/entities/transaction.entity';
import { TransactionDTO } from '../../presentation/dtos/TransactionDto';

export class TransactionMapper {
  static entityToDomain(entity: TransactionEntity): Transaction {
    return new Transaction(
      entity.id,
      entity.walletId,
      new Amount(Number(entity.amount)), // Ensuring decimal from DB is a Number
      entity.concept,
      new TransactionType(entity.type as any),
      new TransactionCategory(entity.category),
      entity.destinationWalletId,
    );
  }

  static toDto(entity: Transaction): TransactionDTO {
    return {
      id: entity._id,
      type: entity._type,
      amount: entity._amount,
      concept: entity._concept,
      walletId: entity._walletId,
      category: entity._category,
      formattedAmount: entity._formattedBalance,
      destinationWalletId: entity._destinationWalletId,
    };
  }
}
