import type {
  WalletDto,
  CreateWalletPayload,
} from "../interfaces/WalletRepositoryDtos";

import type { Wallet } from "../../domain/entities/Wallet";
import { ApiService } from "../../../../core/services/ApiService";
import type { APIClient } from "src/infrastructure/config/APIClient";
import { WalletMapper } from "../../application/mappers/WalletMapper";
import type { FailureHandler } from "src/core/services/FailureHandler";
import type { WalletRepository } from "../../domain/interfaces/WalletRepository";

export class WalletRepositoryImpl
  extends ApiService
  implements WalletRepository
{
  constructor(APIClient: APIClient, failureHandler: FailureHandler) {
    super(APIClient, failureHandler);
  }

  async getAll(): Promise<Wallet[]> {
    const response = await this.get<WalletDto[]>("wallet");
    return response.data.map((wallet) => WalletMapper.toDomain(wallet));
  }

  async create(payload: CreateWalletPayload): Promise<Wallet> {
    const response = await this.post<WalletDto>("wallet", payload);
    return WalletMapper.toDomain(response.data);
  }
}
