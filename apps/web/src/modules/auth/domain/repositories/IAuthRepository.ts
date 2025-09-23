import type { ApiRes } from "../../../../core/interfaces/IApiResponse";
import type { SignInCredentials } from "../interfaces/SignInCredentials";
import type { SignUpCredentials } from "../interfaces/SignUpCredentials";
import type { IAuthResponse } from "../../data/interfaces/IAuthResponse";

export interface IAuthRepository {
  signIn(body: SignInCredentials): Promise<ApiRes<IAuthResponse>>;
  signUp(body: SignUpCredentials): Promise<ApiRes<IAuthResponse>>;
}
