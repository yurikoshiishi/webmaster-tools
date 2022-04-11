export class ClientStorage<T = any> {
  key: string;
  defaultValue: T;

  constructor(key: string, defaultValue: T) {
    this.key = key;
    this.defaultValue = defaultValue;
  }

  update(data: T) {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  get(): T {
    if (typeof window === "undefined") {
      return this.defaultValue;
    }
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : this.defaultValue;
  }
}
