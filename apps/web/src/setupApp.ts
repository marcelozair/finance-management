import {
  LANGUAGE_STORAGE_KEY,
  THEME_STORAGE_KEY,
} from "./core/const/appConfig";

import { defaultLocale } from "./core/const/locales";
import { LoggerService } from "./core/utils/logger";
import { LocalStorageService } from "./core/utils/localStorage";
import { ConfigurationService } from "./core/utils/configuration";
import { serviceLocator, ServiceName } from "./core/services/ServiceLocator";

// Global instances Implementation
const configurationService = new ConfigurationService();
const localStorageService = new LocalStorageService();

const loggerLevel = configurationService.ENV === "PRODUCTION" ? 2 : 0;
const logger = new LoggerService(loggerLevel);

/**
 * Get the language based on navigator class
 * In case invalid language or missing one return en (English)
 * @returns {string} language
 */
function getLanguageBasedNavigator() {
  const locale = navigator.language || defaultLocale; // e.g. "es-ES", "en-US"
  logger.debug(`[Setup] Navigator language: '${locale}'`);
  return locale.split(/[-_]/)[0].toLowerCase(); // "es" or "en"
}

/**
 * Detects the user's preferred color scheme (light or dark).
 * @returns {"light" | "dark"} User theme
 */
function getBrowserTheme(): "dark" | "light" {
  // Get theme from local storage
  const theme = localStorageService.get<"dark" | "light">(
    THEME_STORAGE_KEY,
    null,
  );

  if (theme) return theme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Setup application function
 * Ensure verify neccessary metada for application critical functionalities
 */
export const setupApplication = (): {
  theme: "dark" | "light";
} => {
  logger.debug("[SetUp] Starting setting up configurations ...");

  // Service Locator initalizing ...
  serviceLocator.register(ServiceName.LoggerService, logger);
  serviceLocator.register(ServiceName.LocalStorage, localStorageService);

  // Setting up default language client
  const language = getLanguageBasedNavigator();
  localStorageService.save(LANGUAGE_STORAGE_KEY, language);
  logger.debug(`[Setup] Config '${language}' as default language`);

  // Setting up default user theme
  const theme = getBrowserTheme();
  localStorageService.save(THEME_STORAGE_KEY, theme);
  logger.debug(`[Setup] Config '${theme}' as default UI theme`);

  return { theme };
};
