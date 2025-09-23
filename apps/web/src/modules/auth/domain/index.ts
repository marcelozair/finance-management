import { SignInUseCase } from "./useCases/SignInUseCase";
import { AuthRepository } from "../data/repositories/AuthRepository";
import type { SignInCredentials } from "./interfaces/SignInCredentials";
import type { SignUpCredentials } from "./interfaces/SignUpCredentials";
import { AuthorizationCookieHandler } from "../../../core/services/AuthorizationCookie";

export class AuthDomain {
  private readonly signInUseCase: SignInUseCase;

  constructor() {
    const authRepository = new AuthRepository();
    const authorizationHandler = new AuthorizationCookieHandler();

    this.signInUseCase = new SignInUseCase(
      authRepository,
      authorizationHandler
    );
  }

  public async signIn(body: SignInCredentials) {
    return this.signInUseCase.execute(body);
  }

  public async signUp(body: SignUpCredentials) {
    return this.signInUseCase.execute(body);
  }
}
