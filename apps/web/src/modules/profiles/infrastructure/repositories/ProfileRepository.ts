import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
} from "../../../../core/const/appConfig";
import { API_PROFILES_BASE_URL } from "../../../../core/const/apiConfiguration";
import { ApiService } from "../../../../core/services/ApiService";
import { serviceLocator } from "../../../../core/services/ServiceLocator";
import { CreateApiClient } from "../../../../core/services/CreateApiClient";
import type { ApiRes } from "../../../../core/interfaces/IApiResponse";

import type { ProfileRepository } from "../../domain/interfaces/ProfileRepository";
import type { Profile } from "../../domain/entities/Profile";
import { getProfilesEndpoint } from "../endpoints/profileEndpoint";
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

  getProfiles(): Promise<ApiRes<Profile[]>> {
    return this.get<ApiRes<Profile[]>>(getProfilesEndpoint);
  }
}
