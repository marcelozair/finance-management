import type { IAuthRepository } from "../repositories/IAuthRepository";
import type { ISessionUser } from "../../data/interfaces/IAuthResponse";
import type { IVerifyCode } from "../interfaces/IVerifyCode";

export class VerifyCodeUseCase {
  private readonly authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(body: IVerifyCode): Promise<ISessionUser> {
    const { data } = await this.authRepository.verifyCode(body);
    return data;
  }
}
