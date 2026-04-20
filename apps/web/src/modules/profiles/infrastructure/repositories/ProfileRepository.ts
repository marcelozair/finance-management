import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
} from "../../../../shared/const/appConfig";

import type { Profile } from "../../domain/entities/Profile";
import { ApiService } from "../../../../core/services/ApiService";
import { getProfilesEndpoint } from "../endpoints/profileEndpoint";
import { serviceLocator } from "../../../../core/services/ServiceLocator";
import { CreateApiClient } from "../../../../core/services/CreateApiClient";
import { API_PROFILES_BASE_URL } from "../../../../shared/const/apiConfiguration";
import type { ProfileRepository } from "../../domain/interfaces/ProfileRepository";
import { SessionCookieStore } from "../../../auth/infrastructure/services/SessionCookieStore";

export class ProfileRepositoryImpl
  extends ApiService
  implements ProfileRepository
{
  constructor() {
    const failureHandler = serviceLocator.getFailureHandler();
    const localStorage = serviceLocator.getLocalStorage();
    const sessionStoreService = new SessionCookieStore();

    const ApiClient = new CreateApiClient({
      baseUrl: API_PROFILES_BASE_URL,
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

  async getProfiles(): Promise<Profile[]> {
    const response = await this.get<Profile[]>(getProfilesEndpoint);
    return response.data;
  }
}
