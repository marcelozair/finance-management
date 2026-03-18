import type { Wallet } from "../../domain/entities/Wallet";
import type { WalletRepository } from "../../domain/interfaces/WalletRepository";

export class GetWalletUseCase {
  constructor(private readonly repository: WalletRepository) {}

  execute(profileId: number): Promise<Wallet[]> {
    return this.repository.getAll(profileId);
  }
}
