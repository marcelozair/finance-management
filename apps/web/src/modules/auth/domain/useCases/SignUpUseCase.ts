import type { IAuthRepository } from "../repositories/IAuthRepository";
import type { SignUpCredentials } from "../interfaces/SignUpCredentials";

export class SignUpUseCase {
  private readonly authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(signUpCredentials: SignUpCredentials): Promise<void> {
    await this.authRepository.signUp(signUpCredentials);
  }
}
