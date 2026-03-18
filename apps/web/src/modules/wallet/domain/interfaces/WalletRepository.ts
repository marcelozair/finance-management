import type { Wallet } from "../entities/Wallet";

export interface WalletRepository {
  getAll(profileId: number): Promise<Wallet[]>;
}
