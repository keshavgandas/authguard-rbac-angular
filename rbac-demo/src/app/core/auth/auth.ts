import { Injectable, computed, signal } from '@angular/core';
import type { Role, User } from './user.model';

const STORAGE_KEY = 'rbac_demo_user';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(readFromStorage());
  user = computed(() => this._user());
  role = computed<('Guest' | Role)>(() => this._user()?.role ?? 'Guest');

  async login(username: string, role: Role): Promise<User> {
    const user: User = {
      id: 1, username, role,
      token: btoa(`${username}:${role}:${Date.now()}`)
    };
    this._user.set(user);
    writeToStorage(user);
    return user;
  }

  logout() { this._user.set(null); writeToStorage(null); }
  isLoggedIn(): boolean { return !!this._user(); }

  hasAnyRole(roles: Role[]): boolean {
    const r = this._user()?.role;
    if (!r) return false;
    const rank: Record<Role, number> = { User: 1, Admin: 2, SuperAdmin: 3 };
    const need = Math.min(...roles.map(x => rank[x]));
    return rank[r] >= need;
  }

  getToken(): string | null { return this._user()?.token ?? null; }
}

function readFromStorage(): User | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch { return null; }
}

function writeToStorage(user: User | null) {
  if (!isBrowser()) return;
  try {
    if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch { /* ignore */ }
}
