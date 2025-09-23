import {
  LANGUAGE_STORAGE_KEY,
  THEME_STORAGE_KEY,
} from "./core/const/appConfig";
import { LocalStorageService } from "./core/utils/localStorage";
import { serviceLocator, ServiceName } from "./core/services/ServiceLocator";
import { LoggerService } from "./core/utils/logger";

// Global instances Implementation
const logger = new LoggerService();
const localStorageService = new LocalStorageService();

/**
 * Get the language based on navigator class
 * In case invalid language or missing one return en (English)
 * @returns {string} language
 */
function getLanguageBasedNavigator() {
  const locale = navigator.language; // e.g. "es-ES", "en-US"
  logger.info(`[Setup] Navigator language: '${locale}'`);
  return locale.split(/[-_]/)[0].toLowerCase(); // "es" or "en"
}

/**
 * Detects the user's preferred color scheme (light or dark).
 * @returns {"light" | "dark"} User theme
 */
function getBrowserTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Setup application function
 * Ensure verify neccessary metada for application critical functionalities
 */
export const setupApplication = () => {
  // Service Locator initalizing ...
  serviceLocator.register(ServiceName.LoggerService, logger);
  serviceLocator.register(ServiceName.LocalStorage, localStorageService);

  // Setting up default language client
  const language = getLanguageBasedNavigator();
  localStorageService.save(LANGUAGE_STORAGE_KEY, language);
  logger.info(`[Setup] Config '${language}' as default language`);

  // Setting up default user theme
  const theme = getBrowserTheme();
  localStorageService.save(THEME_STORAGE_KEY, theme);
  logger.info(`[Setup] Config '${theme}' as default UI theme`);
};
