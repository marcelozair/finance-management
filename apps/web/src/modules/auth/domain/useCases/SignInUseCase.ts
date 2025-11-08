import type { IAuthRepository } from "../repositories/IAuthRepository";
import type { SignInCredentials } from "../interfaces/SignInCredentials";
import { type IAuthorizationHandler } from "../../../../core/services/AuthorizationCookie";
import type { ISessionUser } from "../../data/interfaces/IAuthResponse";

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

  async execute(signInCredentials: SignInCredentials): Promise<ISessionUser> {
    const { data } = await this.authRepository.signIn(signInCredentials);

    this.authorizationHandler.setAuthorization(data.session.authorizationToken);

    return data;
  }
}
