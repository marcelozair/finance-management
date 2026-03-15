import type { Session } from "../entities/session";

/**
 * **SessionStore interface:**
 * This class contains the logic to save the
 * session into temporal memory for future authetications.
 */
export interface SessionStore {
  save(session: Session): void;
  get(): Session | null;
  clear(): void;
}
