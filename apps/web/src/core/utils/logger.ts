// logger.ts

export enum LogLevel {
  TRACE = 0,
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
  NONE = 6,
}

export class LoggerService {
  private level: LogLevel;

  constructor(level: LogLevel = LogLevel.DEBUG) {
    this.level = level;
  }

  setLevel(level: LogLevel) {
    this.level = level;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.level && this.level !== LogLevel.NONE;
  }

  private format(level: string, message: string): string {
    const time = new Date().toISOString();
    return `[${time}] [${level}] ${message}`;
  }

  trace(message: string, ...optional: unknown[]) {
    if (this.shouldLog(LogLevel.TRACE)) {
      console.log(this.format("TRACE", message), ...optional);
    }
  }

  debug(message: string, ...optional: unknown[]) {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.log(this.format("DEBUG", message), ...optional);
    }
  }

  info(message: string, ...optional: unknown[]) {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(this.format("INFO", message), ...optional);
    }
  }

  warn(message: string, ...optional: unknown[]) {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.format("WARN", message), ...optional);
    }
  }

  error(message: string, ...optional: unknown[]) {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.format("ERROR", message), ...optional);
    }
  }
}
