import type {
  TransactionDTO,
  TransactionList,
  ResponseTransactionList,
} from "../../domain/interfaces/TransactionRepositoryDtos";
import { ApiService } from "../../../../core/services/ApiService";
import type { Transaction } from "../../domain/entities/Transaction";
import type { APIClient } from "src/infrastructure/config/APIClient";
import type { FailureHandler } from "src/core/services/FailureHandler";
import { TransactionMapper } from "../../application/mappers/TransactionMapper";
import type { CreateTransactionDto } from "../../application/dtos/CreateTransactionDto";
import type { TransactionRepository } from "../../domain/interfaces/TransactionRepository";

export class TransactionRepositoryImpl
  extends ApiService
  implements TransactionRepository
{
  constructor(APIClient: APIClient, failureHandler: FailureHandler) {
    super(APIClient, failureHandler);
  }

  async getAll(walletId: number): Promise<TransactionList> {
    const path = `wallet/${walletId}/transactions`;
    const response = await this.get<ResponseTransactionList>(path);

    const transactionList: TransactionList = {
      metadata: response.data.metadata,
      dates: Object.entries(response.data.transactions).map(
        ([date, transactions]) => {
          return {
            date,
            transactions: transactions.map((transaction) =>
              TransactionMapper.toDomain(transaction),
            ),
          };
        },
      ),
    };

    return transactionList;
  }

  async create(
    walletId: number,
    transaction: CreateTransactionDto,
  ): Promise<Transaction> {
    const response = await this.post<TransactionDTO>(
      `wallet/${walletId}/transactions`,
      transaction,
    );

    return TransactionMapper.toDomain(response.data);
  }
}
