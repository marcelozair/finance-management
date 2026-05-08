import { useAtom } from "jotai";
import { useEffect } from "react";

import {
  sessionStore,
  userSessionAtom,
  activeSessionAtom,
  loadingSessionAtom,
} from "./sessionStore";

import type { User } from "@core/domain/entities/User";
import type { Session } from "@core/domain/entities/Session";
import { LOCAL_STORAGE_PROFILE_KEY } from "@shared/const/localStorage";
import type { Profile } from "@modules/profiles/domain/entities/Profile";
import { serviceLocator, ServiceName } from "@core/services/ServiceLocator";
import { AuthenticatedAPIClientImpl } from "@infrastructure/config/APIClient";
import type { SessionStore } from "@modules/auth/domain/interfaces/SessionStore";

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

  const createAuthenticatedAPIClient = (
    authorizationToken: string,
    profileId: number | null,
  ) => {
    // Create Authenticated APIClient
    const AuthenticatedAPIClient = new AuthenticatedAPIClientImpl({
      authorization: authorizationToken,
      profileId: profileId,
    });

    serviceLocator.register(
      ServiceName.AuthenticatedAPIClient,
      AuthenticatedAPIClient,
    );
  };

  const setUserSession = (session: Session, user: User) => {
    const localStorage = serviceLocator.getLocalStorage();
    const storedProfile = localStorage.get<Profile>(
      LOCAL_STORAGE_PROFILE_KEY,
      null as null,
    );

    sessionStore.set(userSessionAtom, user);
    setSession(session);
    createAuthenticatedAPIClient(
      session.authorizationToken,
      storedProfile?.id || null,
    );
  };

  const checkExistSession = async () => {
    if (!session) {
      const localSession = sessionStoreService.get();
      const localStorage = serviceLocator.getLocalStorage();
      const storedProfile = localStorage.get<Profile>(
        LOCAL_STORAGE_PROFILE_KEY,
        null as null,
      );

      if (localSession) {
        setSession(localSession);
        createAuthenticatedAPIClient(
          localSession.authorizationToken,
          storedProfile?.id || null,
        );
      }

      setLoading(false);
    }
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
