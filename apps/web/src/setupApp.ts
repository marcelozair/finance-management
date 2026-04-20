import {
  LANGUAGE_STORAGE_KEY,
  THEME_STORAGE_KEY,
} from "./shared/const/appConfig";

import { serviceLocator, ServiceName } from "./core/services/ServiceLocator";

import { LoggerService } from "@shared/utils/logger";
import { defaultLocale } from "@shared/const/locales";
import { LocalStorageService } from "@shared/utils/localStorage";
import { ConfigurationService } from "@shared/utils/configuration";
import {
  appConfigStore,
  systemAtom,
} from "@shared/presentation/store/appConfig/appConfigStore";

// -----------------------------
// Global instances
// -----------------------------
const configurationService = new ConfigurationService();
const localStorageService = new LocalStorageService();

const loggerLevel = configurationService.ENV === "PRODUCTION" ? 2 : 0;
const logger = new LoggerService(loggerLevel);

// -----------------------------
// Helpers
// -----------------------------
function getLanguageBasedNavigator(): string {
  if (typeof navigator === "undefined") return defaultLocale;

  const locale = navigator.language || defaultLocale;
  logger.debug(`[Setup] Navigator language: '${locale}'`);

  return locale.split(/[-_]/)[0].toLowerCase();
}

function getBrowserTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// -----------------------------
// Setup steps (split responsibilities)
// -----------------------------
function setupServices() {
  serviceLocator.register(ServiceName.LoggerService, logger);
  serviceLocator.register(ServiceName.LocalStorage, localStorageService);
}

function resolveInitialPreferences() {
  const storedLang = localStorageService.get<string>(
    LANGUAGE_STORAGE_KEY,
    null,
  );

  const storedTheme = localStorageService.get<"dark" | "light">(
    THEME_STORAGE_KEY,
    null,
  );

  const lang = storedLang ?? getLanguageBasedNavigator();
  const theme = storedTheme ?? getBrowserTheme();

  return { lang, theme };
}

function initializeState({
  lang,
  theme,
}: {
  lang: string;
  theme: "dark" | "light";
}) {
  appConfigStore.set(systemAtom, { lang, theme });
}

function setupPersistence() {
  // Sync store → localStorage (single source of truth = store)
  appConfigStore.sub(systemAtom, () => {
    const { lang, theme } = appConfigStore.get(systemAtom);

    if (lang) localStorageService.save(LANGUAGE_STORAGE_KEY, lang);
    if (theme) localStorageService.save(THEME_STORAGE_KEY, theme);
  });
}

// -----------------------------
// Public bootstrap
// -----------------------------
export const setupApplication = (): {
  theme: "dark" | "light";
} => {
  logger.debug("[Setup] Starting application setup...");

  setupServices();

  const preferences = resolveInitialPreferences();

  initializeState(preferences);
  setupPersistence();

  logger.debug(
    `[Setup] Initialized with lang='${preferences.lang}', theme='${preferences.theme}'`,
  );

  return { theme: preferences.theme };
};
