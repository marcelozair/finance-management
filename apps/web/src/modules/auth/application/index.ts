import { SignInUseCase } from "./useCases/SignInUseCase";
import { SignUpUseCase } from "./useCases/SignUpUseCase";
import type { VerifyCodeDTO } from "./dtos/VerifyCodeDTO";
import { VerifyCodeUseCase } from "./useCases/VerifyCodeUseCase";
import type { SignInCredentialsDTO } from "./dtos/SignInCredentialsDTO";
import type { SignUpCredentialsDTO } from "./dtos/SignUpCredentialsDTO";
import { AuthRepositoryImpl } from "../infrastructure/repositories/AuthRepository";
import { SessionCookieStore } from "../infrastructure/services/SessionCookieStore";

import type {
  SessionUserDTO,
  SignUpResponseDTO,
} from "../infrastructure/dtos/AuthDTO";

export class AuthDomain {
  private readonly signInUseCase: SignInUseCase;
  private readonly signUpUseCase: SignUpUseCase;
  private readonly verifyCodeUseCase: VerifyCodeUseCase;

  constructor() {
    const authRepository = new AuthRepositoryImpl();
    const sessionStore = new SessionCookieStore();

    this.signUpUseCase = new SignUpUseCase(authRepository);
    this.signInUseCase = new SignInUseCase(authRepository, sessionStore);
    this.verifyCodeUseCase = new VerifyCodeUseCase(
      authRepository,
      sessionStore,
    );
  }

  public async signIn(body: SignInCredentialsDTO): Promise<SessionUserDTO> {
    return this.signInUseCase.execute(body);
  }

  public async signUp(body: SignUpCredentialsDTO): Promise<SignUpResponseDTO> {
    return this.signUpUseCase.execute(body);
  }

  public async verifyCode(body: VerifyCodeDTO): Promise<SessionUserDTO> {
    return this.verifyCodeUseCase.execute(body);
  }
}
