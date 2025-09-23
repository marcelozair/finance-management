import type { User } from "../../../user/domain/entities/User";

export interface IAuthResponse {
  authorization: string;
  user: User;
}
