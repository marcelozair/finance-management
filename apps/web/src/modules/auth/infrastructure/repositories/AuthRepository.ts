import {
  signInEndpoint,
  signUpEndpoint,
  verifyCode,
} from "../endpoints/authEndpoint";

import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
} from "../../../../shared/const/appConfig";

import {
  ApiService,
  type APIResponse,
} from "../../../../core/services/ApiService";
import type { SessionUserDTO, SignUpResponseDTO } from "../dtos/AuthDTO";
import type { VerifyCodeDTO } from "../../application/dtos/VerifyCodeDTO";
import { serviceLocator } from "../../../../core/services/ServiceLocator";
import { API_AUTH_BASE_URL } from "../../../../shared/const/apiConfiguration";
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

  signIn(body: SignInCredentialsDTO): Promise<APIResponse<SessionUserDTO>> {
    return this.post<SessionUserDTO>(signInEndpoint, body);
  }

  signUp(body: SignUpCredentialsDTO): Promise<APIResponse<SignUpResponseDTO>> {
    return this.post<SignUpResponseDTO>(signUpEndpoint, body);
  }

  verifyCode(body: VerifyCodeDTO): Promise<APIResponse<SessionUserDTO>> {
    return this.post<SessionUserDTO>(verifyCode, body);
  }
}
