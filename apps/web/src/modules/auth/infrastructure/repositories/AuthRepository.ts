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
import type { SessionUserDTO, SignUpResponseDTO } from "../dtos/AuthDTO";
import type { VerifyCodeDTO } from "../../application/dtos/VerifyCodeDTO";
import { serviceLocator } from "../../../../core/services/ServiceLocator";
import { API_AUTH_BASE_URL } from "../../../../core/const/apiConfiguration";
import { CreateApiClient } from "../../../../core/services/CreateApiClient";
import type { AuthRepository } from "../../domain/interfaces/AuthRepository";
import type { SignUpCredentialsDTO } from "../../application/dtos/SignUpCredentialsDTO";
import type { SignInCredentialsDTO } from "../../application/dtos/SignInCredentialsDTO";

export class AuthRepositoryImpl extends ApiService implements AuthRepository {
  constructor() {
    const failureHandler = serviceLocator.getFailureHandler();
    const localStorage = serviceLocator.getLocalStorage();

    const ApiClient = new CreateApiClient({
      baseUrl: API_AUTH_BASE_URL,
      language: localStorage.get<string>(
        LANGUAGE_STORAGE_KEY,
        DEFAULT_LANGUAGE,
      ),
    });

    super(ApiClient, failureHandler);
  }

  signIn(body: SignInCredentialsDTO): Promise<ApiRes<SessionUserDTO>> {
    return this.post<ApiRes<SessionUserDTO>>(signInEndpoint, body);
  }

  signUp(body: SignUpCredentialsDTO): Promise<ApiRes<SignUpResponseDTO>> {
    return this.post<ApiRes<SignUpResponseDTO>>(signUpEndpoint, body);
  }

  verifyCode(body: VerifyCodeDTO): Promise<ApiRes<SessionUserDTO>> {
    return this.post<ApiRes<SessionUserDTO>>(verifyCode, body);
  }
}
