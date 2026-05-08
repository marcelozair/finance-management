import type { Wallet } from "../domain/entities/Wallet";
import type { CreateWalletDto } from "./dtos/CreateWalletDto";
import { GetWalletUseCase } from "./useCases/GetWalletsUseCase";
import type { APIClient } from "@infrastructure/config/APIClient";
import type { FailureHandler } from "@core/services/FailureHandler";
import { CreateWalletUseCase } from "./useCases/CreateWalletUseCase";
import { WalletRepositoryImpl } from "../infrastructure/repositories/WalletRepositoryImpl";

export class WalletDomain {
  private readonly getWalletUseCase: GetWalletUseCase;
  private readonly createWalletUseCase: CreateWalletUseCase;

  constructor(APIClient: APIClient, failureHandler: FailureHandler) {
    const walletRepository = new WalletRepositoryImpl(
      APIClient,
      failureHandler,
    );
    this.getWalletUseCase = new GetWalletUseCase(walletRepository);
    this.createWalletUseCase = new CreateWalletUseCase(walletRepository);
  }

  public getAll(): Promise<Wallet[]> {
    return this.getWalletUseCase.execute();
  }

  public createWallet(payload: CreateWalletDto): Promise<Wallet> {
    return this.createWalletUseCase.execute(payload);
  }
}
