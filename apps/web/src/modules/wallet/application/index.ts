import type { Wallet } from "../domain/entities/Wallet";
import type { CreateWalletDto } from "./dtos/CreateWalletDto";
import { GetWalletUseCase } from "./useCases/GetWalletsUseCase";
import { CreateWalletUseCase } from "./useCases/CreateWalletUseCase";
import { WalletRepositoryImpl } from "../infrastructure/repositories/WalletRepositoryImpl";

export class WalletDomain {
  private readonly getWalletUseCase: GetWalletUseCase;
  private readonly createWalletUseCase: CreateWalletUseCase;

  constructor() {
    const walletRepository = new WalletRepositoryImpl();

    this.getWalletUseCase = new GetWalletUseCase(walletRepository);
    this.createWalletUseCase = new CreateWalletUseCase(walletRepository);
  }

  public getAll(profileId: number): Promise<Wallet[]> {
    return this.getWalletUseCase.execute(profileId);
  }

  public createWallet(params: {
    profileId: number;
    payload: CreateWalletDto;
  }): Promise<Wallet> {
    return this.createWalletUseCase.execute(params.profileId, params.payload);
  }
}
