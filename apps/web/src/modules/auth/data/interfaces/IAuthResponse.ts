import type { User } from "../../../../shared/domain/entities/User";

export interface IAuthResponse {
  authorization: string;
  user: User;
}

export interface ISignUpResponse {
  secret: string;
  user: User;
}

export interface ISession {
  sessionId: string;
  authorizationType: string;
  authorizationToken: string;
}

export interface ISessionUser {
  user: User;
  session: ISession;
}
