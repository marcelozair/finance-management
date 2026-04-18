import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
} from "../../../../core/const/appConfig";

import { ApiService } from "../../../../core/services/ApiService";
import type { Transaction } from "../../domain/entities/Transaction";
import type { ApiRes } from "../../../../core/interfaces/IApiResponse";
import { serviceLocator } from "../../../../core/services/ServiceLocator";
import { CreateApiClient } from "../../../../core/services/CreateApiClient";
import { API_WALLETS_BASE_URL } from "../../../../core/const/apiConfiguration";
import type { TransactionDTO } from "../interfaces/TransactionRepositoryDtos";
import { TransactionMapper } from "../../application/mappers/TransactionMapper";
import type { TransactionRepository } from "../../domain/interfaces/TransactionRepository";
import { SessionCookieStore } from "../../../auth/infrastructure/services/SessionCookieStore";
import type { CreateTransactionDto } from "../../application/dtos/CreateTransactionDto";

export class TransactionRepositoryImpl
  extends ApiService
  implements TransactionRepository
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

  async getAll(walletId: number): Promise<Transaction[]> {
    const response = await this.get<ApiRes<TransactionDTO[]>>(
      `${walletId}/transactions`,
    );

    return response.data.map((trans) => TransactionMapper.toDomain(trans));
  }

  async create(
    walletId: number,
    transaction: CreateTransactionDto,
  ): Promise<void> {
    await this.post(`${walletId}/transactions`, transaction);
  }
}
