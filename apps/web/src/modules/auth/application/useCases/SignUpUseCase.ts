import type { SignUpCredentialsDTO } from "../dtos/SignUpCredentialsDTO";
import type { SignUpResponseDTO } from "../../infrastructure/dtos/AuthDTO";
import type { AuthRepository } from "../../domain/interfaces/AuthRepository";

export class SignUpUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(
    signUpCredentials: SignUpCredentialsDTO,
  ): Promise<SignUpResponseDTO> {
    const { data } = await this.authRepository.signUp(signUpCredentials);
    return data;
  }
}
