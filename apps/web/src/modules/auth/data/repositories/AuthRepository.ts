import type {
  IAuthResponse,
  ISessionUser,
  ISignUpResponse,
} from "../interfaces/IAuthResponse";
import {
  signInEndpoint,
  signUpEndpoint,
  verifyCode,
} from "../endpoints/authEndpoint";

import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
} from "../../../../core/const/appConfig";

import { ApiService } from "../../../../core/services/ApiService";
import type { ApiRes } from "../../../../core/interfaces/IApiResponse";
import type { IVerifyCode } from "../../domain/interfaces/IVerifyCode";
import { serviceLocator } from "../../../../core/services/ServiceLocator";
import { API_AUTH_BASE_URL } from "../../../../core/const/apiConfiguration";
import { CreateApiClient } from "../../../../core/services/CreateApiClient";
import type { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import type { SignInCredentials } from "../../domain/interfaces/SignInCredentials";
import type { SignUpCredentials } from "../../domain/interfaces/SignUpCredentials";

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

  signIn(body: SignInCredentials): Promise<ApiRes<ISessionUser>> {
    return this.post<ApiRes<ISessionUser>>(signInEndpoint, body);
  }

  signUp(body: SignUpCredentials): Promise<ApiRes<ISignUpResponse>> {
    return this.post<ApiRes<ISignUpResponse>>(signUpEndpoint, body);
  }

  verifyCode(body: IVerifyCode): Promise<ApiRes<ISessionUser>> {
    return this.post<ApiRes<ISessionUser>>(verifyCode, body);
  }
}
