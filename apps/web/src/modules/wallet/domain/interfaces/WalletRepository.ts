import type { Wallet } from "../entities/Wallet";
import type { CreateWalletDto } from "../../application/dtos/CreateWalletDto";

export interface WalletRepository {
  getAll(): Promise<Wallet[]>;
  create(payload: CreateWalletDto): Promise<Wallet>;
}
