export class LocalStorageService {
  /**
   * Save string, bool, and object values in local storage
   * @param {string} key Key to identify value
   * @param {string | object | boolean} value Value to save in local storage
   */
  save(key: string, value: string | object | boolean): void {
    if (typeof value === "string") {
      localStorage.setItem(key, value);
    } else if (typeof value === "boolean") {
      localStorage.setItem(key, value ? "1" : "0");
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * Get value from local storage
   * @param {string} key Key to retrieve
   * @returns {T | null} Parsed value
   */
  get<T>(key: string, defaultValue?: T): T {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue as T;

    if (raw === "1") return true as T;
    if (raw === "0") return false as T;

    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as T;
    }
  }

  /**
   * Update existing value in local storage
   * @param {string} key Key to update
   * @param {Partial<object> | string | boolean} newValue Value to merge or overwrite
   */
  update(key: string, newValue: string | boolean | object): void {
    const current = this.get(key);

    if (
      typeof current === "object" &&
      current !== null &&
      typeof newValue === "object"
    ) {
      const merged = { ...current, ...newValue };
      this.save(key, merged);
    } else {
      this.save(key, newValue);
    }
  }
}
