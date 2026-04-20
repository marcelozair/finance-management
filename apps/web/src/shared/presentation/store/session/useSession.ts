import {
  sessionStore,
  userSessionAtom,
  activeSessionAtom,
  loadingSessionAtom,
} from "./sessionStore";

import { useEffect } from "react";

import type { User } from "src/core/domain/entities/User";
import type { Session } from "src/core/domain/entities/Session";
import type { SessionStore } from "src/modules/auth/domain/interfaces/SessionStore";
import { useAtom } from "jotai";
import { AuthenticatedAPIClientImpl } from "src/infrastructure/config/APIClient";
import { serviceLocator, ServiceName } from "src/core/services/ServiceLocator";

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

  const createAuthenticatedAPIClient = (authorizationToken: string) => {
    // Create Authenticated APIClient
    const AuthenticatedAPIClient = new AuthenticatedAPIClientImpl({
      authorization: authorizationToken,
    });

    serviceLocator.register(
      ServiceName.AuthenticatedAPIClient,
      AuthenticatedAPIClient,
    );
  };

  const setUserSession = (session: Session, user: User) => {
    sessionStore.set(userSessionAtom, user);
    setSession(session);
    createAuthenticatedAPIClient(session.authorizationToken);
  };

  const checkExistSession = async () => {
    const localSession = sessionStoreService.get();

    if (localSession) {
      setSession(localSession);
      createAuthenticatedAPIClient(localSession.authorizationToken);
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
