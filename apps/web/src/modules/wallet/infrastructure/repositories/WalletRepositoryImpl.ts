import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
} from "../../../../shared/const/appConfig";

import type {
  WalletDto,
  CreateWalletPayload,
} from "../interfaces/WalletRepositoryDtos";

import type { Wallet } from "../../domain/entities/Wallet";
import { ApiService } from "../../../../core/services/ApiService";
import { WalletMapper } from "../../application/mappers/WalletMapper";
import { serviceLocator } from "../../../../core/services/ServiceLocator";
import { CreateApiClient } from "../../../../core/services/CreateApiClient";
import { API_WALLETS_BASE_URL } from "../../../../shared/const/apiConfiguration";
import type { WalletRepository } from "../../domain/interfaces/WalletRepository";
import { SessionCookieStore } from "../../../auth/infrastructure/services/SessionCookieStore";

export class WalletRepositoryImpl
  extends ApiService
  implements WalletRepository
{
  constructor() {
    const failureHandler = serviceLocator.getFailureHandler();
    const localStorage = serviceLocator.getLocalStorage();
    const sessionStoreService = new SessionCookieStore();

    const ApiClient = new CreateApiClient({
      baseUrl: API_WALLETS_BASE_URL,
      language: localStorage.get<string>(
        LANGUAGE_STORAGE_KEY,
        DEFAULT_LANGUAGE,
      ),
    });

    const session = sessionStoreService.get();

    if (session?.authorizationToken) {
      ApiClient.apiClient.defaults.headers.common["Authorization"] =
        `Bearer ${session.authorizationToken}`;
    }

    super(ApiClient, failureHandler);
  }

  async getAll(profileId: number): Promise<Wallet[]> {
    this.client.defaults.headers.common["profile-id"] = profileId;
    const response = await this.get<WalletDto[]>("");
    return response.data.map((wallet) => WalletMapper.toDomain(wallet));
  }

  async create(
    profileId: number,
    payload: CreateWalletPayload,
  ): Promise<Wallet> {
    this.client.defaults.headers.common["profile-id"] = profileId;
    const response = await this.post<WalletDto>("", payload);
    return WalletMapper.toDomain(response.data);
  }
}
