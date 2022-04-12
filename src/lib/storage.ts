export interface ClientStorageInit<T> {
  key: string;
  defaultValue: T;
  beforeUpdate?: (data: T) => T;
}

export class ClientStorage<T = any> {
  key: string;
  defaultValue: T;
  beforeUpdate?: (data: T) => void;

  constructor({ defaultValue, key, beforeUpdate }: ClientStorageInit<T>) {
    this.key = key;
    this.defaultValue = defaultValue;
    this.beforeUpdate = beforeUpdate;
  }

  update(data: T) {
    if (typeof window === "undefined") {
      return;
    }
    const modifiedData = this.beforeUpdate?.(data) ?? data;
    localStorage.setItem(this.key, JSON.stringify(modifiedData));
  }

  get(): T {
    if (typeof window === "undefined") {
      return this.defaultValue;
    }
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : this.defaultValue;
  }
}
