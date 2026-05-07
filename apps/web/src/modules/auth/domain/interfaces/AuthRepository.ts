import type {
  SessionUserDTO,
  SignUpResponseDTO,
} from "../../infrastructure/dtos/AuthDTO";
import type { APIResponse } from "src/core/services/ApiService";
import type { VerifyCodeDTO } from "../../application/dtos/VerifyCodeDTO";
import type { SignInCredentialsDTO } from "../../application/dtos/SignInCredentialsDTO";
import type { SignUpCredentialsDTO } from "../../application/dtos/SignUpCredentialsDTO";

export interface AuthRepository {
  verifyCode(body: VerifyCodeDTO): Promise<APIResponse<SessionUserDTO>>;
  signIn(body: SignInCredentialsDTO): Promise<APIResponse<SessionUserDTO>>;
  signUp(body: SignUpCredentialsDTO): Promise<APIResponse<SignUpResponseDTO>>;
}
