/* eslint-disable @typescript-eslint/no-explicit-any */

import { FailureHandler } from "./FailureHandler";

import type { LoggerService } from "@shared/utils/logger";
import type { APIClient } from "@infrastructure/config/APIClient";
import type { LocalStorageService } from "@shared/utils/localStorage";

export enum ServiceName {
  LocalStorage = "LocalStorage",
  LoggerService = "LoggerService",
  FailureHandler = "FailureHandler",
  AuthenticatedAPIClient = "AuthenticatedAPIClient",
}

class ServiceLocator {
  private services: Map<string, any> = new Map();

  constructor() {
    this.register(ServiceName.FailureHandler, new FailureHandler());
  }

  get<T>(name: ServiceName): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service not found: ${name}`);
    }
    return service;
  }

  register<T>(name: string, service: T): void {
    this.services.set(name, service);
  }

  getFailureHandler(): FailureHandler {
    return this.get<FailureHandler>(ServiceName.FailureHandler);
  }

  getLocalStorage(): LocalStorageService {
    return this.get<LocalStorageService>(ServiceName.LocalStorage);
  }

  getLogger(): LoggerService {
    return this.get<LoggerService>(ServiceName.LoggerService);
  }

  getAuthenticatedAPIClient(): APIClient {
    return this.get<APIClient>(ServiceName.AuthenticatedAPIClient);
  }
}

export const serviceLocator = new ServiceLocator();
