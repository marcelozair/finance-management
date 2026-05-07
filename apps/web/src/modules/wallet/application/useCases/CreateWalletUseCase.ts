import type { Wallet } from "../../domain/entities/Wallet";
import type { WalletRepository } from "../../domain/interfaces/WalletRepository";
import type { CreateWalletDto } from "../dtos/CreateWalletDto";

export class CreateWalletUseCase {
  constructor(private readonly walletRepository: WalletRepository) {}

  public execute(payload: CreateWalletDto): Promise<Wallet> {
    return this.walletRepository.create(payload);
  }
}
