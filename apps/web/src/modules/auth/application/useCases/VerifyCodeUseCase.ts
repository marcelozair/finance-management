import { SessionMapper } from "../mappers/SessionMapper";
import type { VerifyCodeDTO } from "../dtos/VerifyCodeDTO";
import type { SessionUserDTO } from "../../infrastructure/dtos/AuthDTO";
import type { SessionStore } from "../../domain/interfaces/SessionStore";
import type { AuthRepository } from "../../domain/interfaces/AuthRepository";

export class VerifyCodeUseCase {
  private readonly sessionStore: SessionStore;
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository, sessionStore: SessionStore) {
    this.authRepository = authRepository;
    this.sessionStore = sessionStore;
  }

  async execute(body: VerifyCodeDTO): Promise<SessionUserDTO> {
    const { data } = await this.authRepository.verifyCode(body);
    this.sessionStore.save(SessionMapper.toDomain(data.session));
    return data;
  }
}
