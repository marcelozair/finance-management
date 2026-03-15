import {
  sessionStore,
  userSessionAtom,
  activeSessionAtom,
} from "./sessionStore";

import type { User } from "@shared/domain/entities/User";
import type { Session } from "@shared/domain/entities/Session";
import type { SessionStore } from "src/modules/auth/domain/interfaces/SessionStore";

/**
 * Dependencies that the hook needs. You can provide them via context or
 * directly when calling the hook from a component. The hook itself is
 * presentation-level and should only depend on abstractions (interfaces,
 * use‑cases), not concrete implementations.
 */
export interface UseSessionDeps {
  sessionStoreService: SessionStore;
}

/**
 * Custom hook to centralize logic around user session retrieval.
 * Clean-architecture rules:
 *  - this hook lives in the presentation layer
 *  - it depends on an interface for storage and, if needed, a use case to
 *    call the API
 *  - it never directly imports infrastructure classes such as
 *    `SessionCookieStore` or repositories.
 */
export const useSession = ({ sessionStoreService }: UseSessionDeps) => {
  const setUserSession = (session: Session, user: User) => {
    console.log("Setting user session:", { session, user });
    sessionStore.set(activeSessionAtom, session);
    sessionStore.set(userSessionAtom, user);
  };

  const checkExistSession = async () => {
    const localSession = sessionStoreService.get();
    console.info(`Loading local session | Result: ${localSession}`);

    if (localSession) {
      sessionStore.set(activeSessionAtom, localSession);

      // if (loadSessionUseCase) {
      //   // call the use-case to refresh user data from API
      //   const loaded = await loadSessionUseCase.execute(localSession);
      //   if (loaded.user) {
      //     sessionStore.set(userSessionAtom, loaded.user);
      //   }
      // }
    }
  };

  checkExistSession();

  return {
    user: sessionStore.get(userSessionAtom),
    session: sessionStore.get(activeSessionAtom),
    clearUserSession: () => sessionStoreService.clear(),
    setUserSession,
  };
};
