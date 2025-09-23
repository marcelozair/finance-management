import type { User } from "../../../user/domain/entities/User";
import type { IAuthRepository } from "../repositories/IAuthRepository";
import type { SignUpCredentials } from "../interfaces/SignUpCredentials";
import { AuthorizationCookie } from "../../../../core/services/AuthorizationCookie";

export class SignUpUseCase {
  private readonly authRepository: IAuthRepository;
  private readonly authorizationCookie: AuthorizationCookie;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
    this.authorizationCookie = new AuthorizationCookie();
  }

  async execute(signUpCredentials: SignUpCredentials): Promise<User> {
    const { data } = await this.authRepository.signUp(signUpCredentials);

    this.authorizationCookie.setAuthorization(data.authorization);

    return data.user;
  }
}
