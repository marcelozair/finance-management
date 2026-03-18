import type { Wallet } from "../domain/entities/Wallet";
import { WalletRepositoryImpl } from "../infrastructure/repositories/WalletRepositoryImpl";
import { GetWalletUseCase } from "./useCases/GetWalletsUseCase";

export class WalletDomain {
  private readonly getWalletUseCase: GetWalletUseCase;

  constructor() {
    const walletRepository = new WalletRepositoryImpl();

    this.getWalletUseCase = new GetWalletUseCase(walletRepository);
  }

  public getAll(profileId: number): Promise<Wallet[]> {
    return this.getWalletUseCase.execute(profileId);
  }
}
