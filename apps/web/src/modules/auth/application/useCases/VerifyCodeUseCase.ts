import type { AuthRepository } from "../../domain/interfaces/AuthRepository";
import type { SessionUserDTO } from "../../infrastructure/dtos/AuthDTO";
import type { VerifyCodeDTO } from "../dtos/VerifyCodeDTO";

export class VerifyCodeUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(body: VerifyCodeDTO): Promise<SessionUserDTO> {
    const { data } = await this.authRepository.verifyCode(body);
    return data;
  }
}
