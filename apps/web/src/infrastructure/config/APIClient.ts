import axios from "axios";
import type { AxiosInstance } from "axios";

import { API_BASE_URL } from "@shared/const/apiConfiguration";

export interface AuthenticatedAPIClientConfig {
  language?: string;
  profileId?: number | null;
  authorization?: string;
}

export abstract class APIClient {
  readonly apiClient: AxiosInstance;

  constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  /**
   * Update the Accept-Language header property to request API
   * @param language language for Accept-Language header property
   */
  updateAcceptLanguage(language: string): void {
    this.apiClient.defaults.headers.common["Accept-Language"] = language;
  }

  updateProfileId(value: number) {
    this.apiClient.defaults.headers.common["profile-id"] = value;
  }
}

export class AuthenticatedAPIClientImpl extends APIClient {
  constructor(config: AuthenticatedAPIClientConfig) {
    // Using default language in case is undefined
    const language = config.language;

    // Creating Axios instance (Authenticated already)
    // Integrate profile-id Value for API operations.
    const instance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language,
        "profile-id": config.profileId,
        Authorization: `Bearer ${config.authorization}`,
      },
    });

    super(instance);
  }
}
