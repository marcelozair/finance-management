import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
} from "../../../../core/const/appConfig";
import { API_WALLETS_BASE_URL } from "../../../../core/const/apiConfiguration";
import { ApiService } from "../../../../core/services/ApiService";
import { serviceLocator } from "../../../../core/services/ServiceLocator";
import { CreateApiClient } from "../../../../core/services/CreateApiClient";
import type { ApiRes } from "../../../../core/interfaces/IApiResponse";
import { SessionCookieStore } from "../../../auth/infrastructure/services/SessionCookieStore";
import type { WalletRepository } from "../../domain/interfaces/WalletRepository";
import type { Wallet } from "../../domain/entities/Wallet";
import type {
  WalletDto,
  CreateWalletPayload,
} from "../interfaces/WalletRepositoryDtos";
import { CREATE, GET_ALL } from "../endpoints";
import { WalletMapper } from "../../application/mappers/WalletMapper";

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

    const response = await this.get<ApiRes<WalletDto[]>>(GET_ALL);

    return response.data.map((wallet) => WalletMapper.toDomain(wallet));
  }

  async create(
    profileId: number,
    payload: CreateWalletPayload,
  ): Promise<Wallet> {
    this.client.defaults.headers.common["profile-id"] = profileId;
    const response = await this.post<ApiRes<WalletDto>>(`${CREATE}`, payload);

    return WalletMapper.toDomain(response.data);
  }
}
