import type { Wallet } from "../entities/Wallet";
import type { CreateWalletDto } from "../../application/dtos/CreateWalletDto";

export interface WalletRepository {
  getAll(profileId: number): Promise<Wallet[]>;
  create(profileId: number, payload: CreateWalletDto): Promise<Wallet>;
}
