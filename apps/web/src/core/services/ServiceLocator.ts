/* eslint-disable @typescript-eslint/no-explicit-any */

import type { LocalStorageService } from "../utils/localStorage";
import type { LoggerService } from "../utils/logger";
import { FailureHandler } from "./FailureHandler";

export enum ServiceName {
  FailureHandler = "FailureHandler",
  LocalStorage = "LocalStorage",
  LoggerService = "LoggerService",
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
}

export const serviceLocator = new ServiceLocator();
