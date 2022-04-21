import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  public getValue<T>(key: string): T|null {
    if (!!localStorage.getItem(key))
      return JSON.parse(`${localStorage.getItem(key)}`) as T;
    return null;
  }

  public setValue(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

}
