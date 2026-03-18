import { atom, createStore } from "jotai";
import type { Profile } from "../../../../modules/profiles/domain/entities/Profile";

/**
 * Global store instance for profile state
 */
export const profileStore = createStore();

/**
 * Active profile currently selected by the user.
 */
export const activeProfileAtom = atom<Profile | null>(null);
export const loadingProfileAtom = atom<boolean>(true);

/**
 * Initialize default state
 */
profileStore.set(activeProfileAtom, null);
profileStore.set(loadingProfileAtom, true);
