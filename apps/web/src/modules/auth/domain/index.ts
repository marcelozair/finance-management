import type {
  ISessionUser,
  ISignUpResponse,
} from "../data/interfaces/IAuthResponse";

import { SignInUseCase } from "./useCases/SignInUseCase";
import { SignUpUseCase } from "./useCases/SignUpUseCase";
import type { IVerifyCode } from "./interfaces/IVerifyCode";
import { VerifyCodeUseCase } from "./useCases/VerifyCodeUseCase";
import { AuthRepository } from "../data/repositories/AuthRepository";
import type { SignInCredentials } from "./interfaces/SignInCredentials";
import type { SignUpCredentials } from "./interfaces/SignUpCredentials";
import { AuthorizationCookieHandler } from "../../../core/services/AuthorizationCookie";

export class AuthDomain {
  private readonly signInUseCase: SignInUseCase;
  private readonly signUpUseCase: SignUpUseCase;
  private readonly verifyCodeUseCase: VerifyCodeUseCase;

  constructor() {
    const authRepository = new AuthRepository();
    const authHandler = new AuthorizationCookieHandler();

    this.signUpUseCase = new SignUpUseCase(authRepository);
    this.verifyCodeUseCase = new VerifyCodeUseCase(authRepository);
    this.signInUseCase = new SignInUseCase(authRepository, authHandler);
  }

  public async signIn(body: SignInCredentials): Promise<ISessionUser> {
    return this.signInUseCase.execute(body);
  }

  public async signUp(body: SignUpCredentials): Promise<ISignUpResponse> {
    return this.signUpUseCase.execute(body);
  }

  public async verifyCode(body: IVerifyCode): Promise<ISessionUser> {
    return this.verifyCodeUseCase.execute(body);
  }
}
