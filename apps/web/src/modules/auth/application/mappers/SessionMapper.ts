import { Session } from "../../domain/entities/SessionTmp";
import type { SessionDTO } from "../../infrastructure/dtos/AuthDTO";

export class SessionMapper {
  static toDomain(session: SessionDTO): Session {
    return new Session(
      session.sessionId,
      session.authorizationType,
      session.authorizationToken,
    );
  }
}
