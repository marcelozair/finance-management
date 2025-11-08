import type { ApiRes } from "../../../../core/interfaces/IApiResponse";
import type { SignInCredentials } from "../interfaces/SignInCredentials";
import type { SignUpCredentials } from "../interfaces/SignUpCredentials";
import type {
  ISessionUser,
  ISignUpResponse,
} from "../../data/interfaces/IAuthResponse";
import type { IVerifyCode } from "../interfaces/IVerifyCode";

export interface IAuthRepository {
  verifyCode(body: IVerifyCode): Promise<ApiRes<ISessionUser>>;
  signIn(body: SignInCredentials): Promise<ApiRes<ISessionUser>>;
  signUp(body: SignUpCredentials): Promise<ApiRes<ISignUpResponse>>;
}
