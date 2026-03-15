import { Wallet } from '../entities/Wallet';

export abstract class WalletRepository {
  abstract save(profileId: number, wallet: Wallet): Promise<Wallet>;
  abstract getAll(profileId: number): Promise<Wallet[]>;
}
