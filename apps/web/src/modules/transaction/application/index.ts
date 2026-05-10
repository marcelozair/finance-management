import type { APIClient } from "@infrastructure/config/APIClient";
import type { FailureHandler } from "@core/services/FailureHandler";
import { GetCategoriesUseCase } from "./useCases/GetCategoriesUseCase";
import { GetTransactionUseCase } from "./useCases/GetTransactionsUseCase";
import { CreateTransactionUseCase } from "./useCases/CreateTransactionUseCase";
import type { CreateTransactionDto } from "../domain/interfaces/CreateTransactionDto";
import { CategoryRepositoryImpl } from "../infrastructure/repository/CategoryRepositoryImpl";
import { TransactionRepositoryImpl } from "../infrastructure/repository/TransactionRepositoryImpl";
import { DeleteTransactionUseCase } from "./useCases/DeleteTransactionsUseCase";

export class TransactionDomain {
  private readonly getCategoriesUseCase: GetCategoriesUseCase;
  private readonly getTransactionsUseCase: GetTransactionUseCase;
  private readonly createTransactionUseCase: CreateTransactionUseCase;
  private readonly deleteTransactionsUseCase: DeleteTransactionUseCase;

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
    this.deleteTransactionsUseCase = new DeleteTransactionUseCase(
      transactionRepository,
    );
    this.getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);
  }

  public getAllTransactions(walletId: number, page: number, size: number) {
    return this.getTransactionsUseCase.execute(walletId, page, size);
  }

  public deleteTransaction(walletId: number, transactionId: number) {
    return this.deleteTransactionsUseCase.execute(walletId, transactionId);
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
