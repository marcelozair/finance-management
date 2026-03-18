import {
  sessionStore,
  userSessionAtom,
  activeSessionAtom,
  loadingSessionAtom,
} from "./sessionStore";

import { useEffect } from "react";

import type { User } from "@shared/domain/entities/User";
import type { Session } from "@shared/domain/entities/Session";
import type { SessionStore } from "src/modules/auth/domain/interfaces/SessionStore";
import { useAtom } from "jotai";

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
  const [session, setSession] = useAtom(activeSessionAtom, {
    store: sessionStore,
  });

  const [loading, setLoading] = useAtom(loadingSessionAtom, {
    store: sessionStore,
  });

  const setUserSession = (session: Session, user: User) => {
    sessionStore.set(userSessionAtom, user);
    setSession(session);
  };

  const checkExistSession = async () => {
    const localSession = sessionStoreService.get();

    if (localSession) {
      setSession(localSession);
    }

    setLoading(false);
  };

  useEffect(() => {
    checkExistSession();
  }, []);

  return {
    // Values
    session: session,
    loadingSession: loading,
    user: sessionStore.get(userSessionAtom),
    // Methods
    clearUserSession: () => sessionStoreService.clear(),
    setUserSession,
  };
};
