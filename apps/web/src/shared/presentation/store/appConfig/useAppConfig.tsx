import {
  LANGUAGE_STORAGE_KEY,
  THEME_STORAGE_KEY,
} from "@shared/const/appConfig";
import { useAtom } from "jotai";
import { appConfigStore, systemAtom } from "./appConfigStore";
import type { LocalStorageService } from "@shared/utils/localStorage";

export interface SystemConfiguration {
  lang: string | null;
  theme: string | null;
}

export interface AppConfiguration {
  system: SystemConfiguration;
}

export const initializeAppConfig = (
  localStorageService: LocalStorageService,
) => {
  const theme = localStorageService.get<string>(THEME_STORAGE_KEY);
  const lang = localStorageService.get<string>(LANGUAGE_STORAGE_KEY);

  appConfigStore.set(systemAtom, { theme, lang });
};

export const useConfig = (): AppConfiguration => {
  const [system] = useAtom(systemAtom, { store: appConfigStore });
  return { system };
};
