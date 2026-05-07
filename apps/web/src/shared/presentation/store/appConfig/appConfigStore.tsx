import { atom, createStore } from "jotai";
import type { SystemConfiguration } from "./useAppConfig";

/**
 * Create Global Store instance
 */
export const appConfigStore = createStore();

export const systemAtom = atom<SystemConfiguration>({
  lang: null,
  theme: null,
});

appConfigStore.set(systemAtom, { lang: null, theme: null });
