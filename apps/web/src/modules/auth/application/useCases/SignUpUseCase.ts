import type { SignUpCredentialsDTO } from "../dtos/SignUpCredentialsDTO";
import type { SessionStore } from "../../domain/interfaces/SessionStore";
import type { SessionUserDTO } from "../../infrastructure/dtos/AuthDTO";
import type { AuthRepository } from "../../domain/interfaces/AuthRepository";
import { SessionMapper } from "../mappers/SessionMapper";

export class SignUpUseCase {
  private readonly authRepository: AuthRepository;
  private readonly sessionStore: SessionStore;

  constructor(authRepository: AuthRepository, sessionStore: SessionStore) {
    this.authRepository = authRepository;
    this.sessionStore = sessionStore;
  }

  async execute(
    signUpCredentials: SignUpCredentialsDTO,
  ): Promise<SessionUserDTO> {
    const { data } = await this.authRepository.signUp(signUpCredentials);
    this.sessionStore.save(SessionMapper.toDomain(data.session));

    return data;
  }
}
