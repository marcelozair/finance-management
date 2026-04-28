import type {
  TransactionDTO,
  ResponseTransactionList,
} from "../interfaces/ResponseGetAllTransactionsDto";

import { ApiService } from "../../../../core/services/ApiService";
import type { APIClient } from "src/infrastructure/config/APIClient";
import type { Transaction } from "../../domain/entities/Transaction";
import type { FailureHandler } from "src/core/services/FailureHandler";
import type { CreateTransactionDto } from "../../domain/interfaces/CreateTransactionDto";
import { TransactionMapper } from "../../application/mappers/TransactionMapper";
import type { GroupedTransactionsDto } from "../../domain/interfaces/GroupedTransactionsDto";
import type { TransactionRepository } from "../../domain/interfaces/repositories/TransactionRepository";

export class TransactionRepositoryImpl
  extends ApiService
  implements TransactionRepository
{
  constructor(APIClient: APIClient, failureHandler: FailureHandler) {
    super(APIClient, failureHandler);
  }

  async getAll(
    walletId: number,
    page: number,
    size: number,
  ): Promise<GroupedTransactionsDto> {
    const path = `wallet/${walletId}/transactions?page=${page}&limit=${size}`;
    const response = await this.get<ResponseTransactionList>(path);

    const transactionList: GroupedTransactionsDto = {
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
