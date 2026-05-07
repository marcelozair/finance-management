import type { ApiRes } from "../../../../core/interfaces/IApiResponse";
import type { SessionUserDTO } from "../../infrastructure/dtos/AuthDTO";
import type { VerifyCodeDTO } from "../../application/dtos/VerifyCodeDTO";
import type { SignInCredentialsDTO } from "../../application/dtos/SignInCredentialsDTO";
import type { SignUpCredentialsDTO } from "../../application/dtos/SignUpCredentialsDTO";

export interface AuthRepository {
  verifyCode(body: VerifyCodeDTO): Promise<ApiRes<SessionUserDTO>>;
  signIn(body: SignInCredentialsDTO): Promise<ApiRes<SessionUserDTO>>;
  signUp(body: SignUpCredentialsDTO): Promise<ApiRes<SessionUserDTO>>;
}
