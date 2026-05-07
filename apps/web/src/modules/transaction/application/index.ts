import type { APIClient } from "src/infrastructure/config/APIClient";
import { GetCategoriesUseCase } from "./useCases/GetCategoriesUseCase";
import type { FailureHandler } from "src/core/services/FailureHandler";
import { GetTransactionUseCase } from "./useCases/GetTransactionsUseCase";
import { CreateTransactionUseCase } from "./useCases/CreateTransactionUseCase";
import type { CreateTransactionDto } from "../domain/interfaces/CreateTransactionDto";
import { CategoryRepositoryImpl } from "../infrastructure/repository/CategoryRepositoryImpl";
import { TransactionRepositoryImpl } from "../infrastructure/repository/TransactionRepositoryImpl";

export class TransactionDomain {
  private readonly getCategoriesUseCase: GetCategoriesUseCase;
  private readonly getTransactionsUseCase: GetTransactionUseCase;
  private readonly createTransactionUseCase: CreateTransactionUseCase;

  constructor(APIClient: APIClient, failureHandler: FailureHandler) {
    const transactionRepository = new TransactionRepositoryImpl(
      APIClient,
      failureHandler,
    );
    const categoryRepository = new CategoryRepositoryImpl(
      APIClient,
      failureHandler,
    );

    this.getTransactionsUseCase = new GetTransactionUseCase(
      transactionRepository,
    );
    this.createTransactionUseCase = new CreateTransactionUseCase(
      transactionRepository,
    );
    this.getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);
  }

  public getAllTransactions(walletId: number, page: number, size: number) {
    return this.getTransactionsUseCase.execute(walletId, page, size);
  }

  public createTransaction(
    walletId: number,
    transaction: CreateTransactionDto,
  ) {
    return this.createTransactionUseCase.execute(walletId, transaction);
  }

  public getCategories() {
    return this.getCategoriesUseCase.execute();
  }
}
