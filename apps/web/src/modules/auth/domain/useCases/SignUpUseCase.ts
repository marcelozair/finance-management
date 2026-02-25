import type { IAuthRepository } from "../repositories/IAuthRepository";
import type { SignUpCredentials } from "../interfaces/SignUpCredentials";
import type { ISignUpResponse } from "../../data/interfaces/IAuthResponse";

export class SignUpUseCase {
  private readonly authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(
    signUpCredentials: SignUpCredentials,
  ): Promise<ISignUpResponse> {
    const { data } = await this.authRepository.signUp(signUpCredentials);
    return data;
  }
}
