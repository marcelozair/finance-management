import type { SignInCredentialsDTO } from "../dtos/SignInCredentialsDTO";
import type { SessionStore } from "../../domain/interfaces/SessionStore";
import type { AuthRepository } from "../../domain/interfaces/AuthRepository";
import { SessionMapper } from "../mappers/SessionMapper";
import type { SessionUserDTO } from "../../infrastructure/dtos/AuthDTO";

export class SignInUseCase {
  private readonly authRepository: AuthRepository;
  private readonly sessionStore: SessionStore;

  constructor(authRepository: AuthRepository, sessionStore: SessionStore) {
    this.authRepository = authRepository;
    this.sessionStore = sessionStore;
  }

  async execute(
    signInCredentials: SignInCredentialsDTO,
  ): Promise<SessionUserDTO> {
    const { data } = await this.authRepository.signIn(signInCredentials);

    this.sessionStore.save(SessionMapper.toDomain(data.session));

    return data;
  }
}
