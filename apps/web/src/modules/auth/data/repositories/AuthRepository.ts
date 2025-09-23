import type { IAuthResponse } from "../interfaces/IAuthResponse";
import { ApiService } from "../../../../core/services/ApiService";
import type { ApiRes } from "../../../../core/interfaces/IApiResponse";
import { serviceLocator } from "../../../../core/services/ServiceLocator";
import { signInEndpoint, signUpEndpoint } from "../endpoints/authEndpoint";
import { API_AUTH_BASE_URL } from "../../../../core/const/apiConfiguration";
import { CreateApiClient } from "../../../../core/services/CreateApiClient";
import type { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import type { SignInCredentials } from "../../domain/interfaces/SignInCredentials";
import type { SignUpCredentials } from "../../domain/interfaces/SignUpCredentials";

import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
} from "../../../../core/const/appConfig";

export class AuthRepository extends ApiService implements IAuthRepository {
  constructor() {
    const failureHandler = serviceLocator.getFailureHandler();
    const localStorage = serviceLocator.getLocalStorage();

    const ApiClient = new CreateApiClient({
      baseUrl: API_AUTH_BASE_URL,
      language: localStorage.get<string>(
        LANGUAGE_STORAGE_KEY,
        DEFAULT_LANGUAGE
      ),
    });

    super(ApiClient, failureHandler);
  }

  signIn(body: SignInCredentials): Promise<ApiRes<IAuthResponse>> {
    return this.post<ApiRes<IAuthResponse>>(signInEndpoint, body);
  }

  signUp(body: SignUpCredentials): Promise<ApiRes<IAuthResponse>> {
    return this.post<ApiRes<IAuthResponse>>(signUpEndpoint, body);
  }
}
