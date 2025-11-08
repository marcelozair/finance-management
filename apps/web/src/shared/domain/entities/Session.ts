import type { User } from "./User";

export interface Session {
  sessionId: string;
  authorizationType: string;
  authorizationToken: string;
}

export interface ActiveSession {
  user: User;
  session: Session;
}
