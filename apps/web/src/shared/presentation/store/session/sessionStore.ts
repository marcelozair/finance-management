import { atom, createStore } from "jotai";

import type { Session } from "@shared/domain/entities/Session";
import type { User } from "@shared/domain/entities/User";

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
 * Initialize user state in store
 */
sessionStore.set(userSessionAtom, null);
sessionStore.set(activeSessionAtom, null);
