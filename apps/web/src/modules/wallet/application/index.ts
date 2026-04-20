import type { Wallet } from "../domain/entities/Wallet";
import type { CreateWalletDto } from "./dtos/CreateWalletDto";
import { GetWalletUseCase } from "./useCases/GetWalletsUseCase";
import type { Transaction } from "../domain/entities/Transaction";
import type { APIClient } from "src/infrastructure/config/APIClient";
import { CreateWalletUseCase } from "./useCases/CreateWalletUseCase";
import type { FailureHandler } from "src/core/services/FailureHandler";
import type { CreateTransactionDto } from "./dtos/CreateTransactionDto";
import { GetTransactionUseCase } from "./useCases/GetTransactionsUseCase";
import { CreateTransactionUseCase } from "./useCases/CreateTransactionUseCase";
import { WalletRepositoryImpl } from "../infrastructure/repositories/WalletRepositoryImpl";
import { TransactionRepositoryImpl } from "../infrastructure/repositories/TransactionRepositoryImpl";

export class WalletDomain {
  private readonly getWalletUseCase: GetWalletUseCase;
  private readonly createWalletUseCase: CreateWalletUseCase;
  private readonly getTransactionsUseCase: GetTransactionUseCase;
  private readonly createTransactionUseCase: CreateTransactionUseCase;

  constructor(APIClient: APIClient, failureHandler: FailureHandler) {
    const walletRepository = new WalletRepositoryImpl();
    const transactionRepository = new TransactionRepositoryImpl(
      APIClient,
      failureHandler,
    );
    this.getWalletUseCase = new GetWalletUseCase(walletRepository);
    this.createWalletUseCase = new CreateWalletUseCase(walletRepository);
    this.getTransactionsUseCase = new GetTransactionUseCase(
      transactionRepository,
    );
    this.createTransactionUseCase = new CreateTransactionUseCase(
      transactionRepository,
    );
  }

  public getAllTransactions(walletId: number) {
    return this.getTransactionsUseCase.execute(walletId);
  }

  public createTransaction(
    walletId: number,
    transaction: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.createTransactionUseCase.execute(walletId, transaction);
  }

  public getAll(profileId: number): Promise<Wallet[]> {
    return this.getWalletUseCase.execute(profileId);
  }

  public createWallet(
    profileId: number,
    payload: CreateWalletDto,
  ): Promise<Wallet> {
    return this.createWalletUseCase.execute(profileId, payload);
  }
}
