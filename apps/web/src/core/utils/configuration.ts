export type EnvironmentType = "DEVELOPMENT" | "STATING" | "PRODUCTION";

export class ConfigurationService {
  private readonly env;

  readonly ENV: EnvironmentType;

  constructor() {
    this.env = import.meta.env;

    this.ENV = this.getenv<EnvironmentType>("VITE_ENV", "DEVELOPMENT");
  }

  getenv<T>(key: string, defaultValue: T): T {
    const environmentValue = this.env[key];
    if (!environmentValue) return defaultValue;
    return environmentValue as T;
  }
}
