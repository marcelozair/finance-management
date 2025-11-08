import { useAtom } from "jotai";

import {
  activeSessionAtom,
  userSessionAtom,
  sessionStore,
} from "./sessionStore";

import type { User } from "@shared/domain/entities/User";
import type { Session } from "@shared/domain/entities/Session";

/**
 * Custom hook to centralize logic around user session retrieval
 * Allows interact with session store, getting user and session data
 */
export const useSession = () => {
  const [user] = useAtom(userSessionAtom, { store: sessionStore });
  const [session] = useAtom(activeSessionAtom, { store: sessionStore });

  /**
   * Set user session, based on SignUp or SigIn events
   */
  const setUserSession = (session: Session, user: User) => {
    sessionStore.set(activeSessionAtom, session);
    sessionStore.set(userSessionAtom, user);
  };

  return {
    user,
    session,
    // Methods to interact with session store
    setUserSession,
  };
};
