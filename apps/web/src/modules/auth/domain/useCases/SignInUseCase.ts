import type { User } from "../../../user/domain/entities/User";
import type { IAuthRepository } from "../repositories/IAuthRepository";
import type { SignInCredentials } from "../interfaces/SignInCredentials";
import { type IAuthorizationHandler } from "../../../../core/services/AuthorizationCookie";

export class SignInUseCase {
  private readonly authRepository: IAuthRepository;
  private readonly authorizationHandler: IAuthorizationHandler;

  constructor(
    authRepository: IAuthRepository,
    authorizationHandler: IAuthorizationHandler
  ) {
    this.authRepository = authRepository;
    this.authorizationHandler = authorizationHandler;
  }

  async execute(signInCredentials: SignInCredentials): Promise<User> {
    const { data } = await this.authRepository.signIn(signInCredentials);

    this.authorizationHandler.setAuthorization(data.authorization);

    return data.user;
  }
}
