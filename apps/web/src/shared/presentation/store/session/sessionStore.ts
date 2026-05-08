import { atom, createStore } from "jotai";

import type { Session } from "@core/domain/entities/Session";
import type { User } from "@core/domain/entities/User";

/**
 * Create Global Store instance
 */
export const sessionStore = createStore();

/**
 * Active session tracked, this value will be empty as default
 */
export const activeSessionAtom = atom<Session | null>(null);

/**
 * User value in the current session, this value will be empty as default
 */
export const userSessionAtom = atom<User | null>(null);

/**
 * Value that indicates if sessions is proccessing
 */
export const loadingSessionAtom = atom<boolean>(true);

/**
 * Initialize user state in store
 */
sessionStore.set(userSessionAtom, null);
sessionStore.set(activeSessionAtom, null);
sessionStore.set(loadingSessionAtom, true);
