import { Session } from "../../domain/entities/session";
import type { SessionStore } from "../../domain/interfaces/SessionStore";

export class SessionCookieStore implements SessionStore {
  private sessionKey: string = "session-cookie";

  /**
   * This method handle session and save it into cookies memories
   * Expres time is set based on session configuration
   * @param session Session entity to be save
   */
  save(session: Session): void {
    const expires = new Date(
      Date.now() + session.expireIn * 864e5,
    ).toUTCString();

    document.cookie = `${this.sessionKey}=${session.toString()}; expires=${expires}; path=/`;

    console.info(`Session save into document cookies ${document.cookie}`);
  }

  /**
   * Read the stored session from cookies.
   * Returns a Session entity or null if not found/invalid.
   */
  get(): Session | null {
    const cookies = document.cookie.split("; ");
    const entry = cookies.find((c) => c.startsWith(`${this.sessionKey}=`));
    if (!entry) return null;

    try {
      const json = entry.split("=")[1];
      const rawSession = JSON.parse(json);

      return new Session(
        rawSession.sessionId,
        rawSession.authorizationType,
        rawSession.authorizationToken,
      );
    } catch {
      return null;
    }
  }

  /**
   * Remove the session from cookies.
   */
  clear(): void {
    document.cookie = `${this.sessionKey}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}
