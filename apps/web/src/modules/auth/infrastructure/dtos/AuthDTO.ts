import type { User } from "../../../../core/domain/entities/User

export interface AuthResponseDTO {
  authorization: string;
  user: User;
}

export interface SignUpResponseDTO {
  secret: string;
  user: User;
}

export interface SessionDTO {
  sessionId: string;
  authorizationType: string;
  authorizationToken: string;
}

export interface SessionUserDTO {
  user: User;
  session: SessionDTO;
}
