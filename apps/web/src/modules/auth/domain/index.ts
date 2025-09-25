import { SignInUseCase } from "./useCases/SignInUseCase";
import { AuthRepository } from "../data/repositories/AuthRepository";
import type { SignInCredentials } from "./interfaces/SignInCredentials";
import type { SignUpCredentials } from "./interfaces/SignUpCredentials";
import { AuthorizationCookieHandler } from "../../../core/services/AuthorizationCookie";
import { SignUpUseCase } from "./useCases/SignUpUseCase";

export class AuthDomain {
  private readonly signInUseCase: SignInUseCase;
  private readonly signUpUseCase: SignUpUseCase;

  constructor() {
    const authRepository = new AuthRepository();
    const authorizationHandler = new AuthorizationCookieHandler();
    this.signUpUseCase = new SignUpUseCase(authRepository);
    this.signInUseCase = new SignInUseCase(
      authRepository,
      authorizationHandler
    );
  }

  public async signIn(body: SignInCredentials) {
    return this.signInUseCase.execute(body);
  }

  public async signUp(body: SignUpCredentials) {
    return this.signUpUseCase.execute(body);
  }
}
