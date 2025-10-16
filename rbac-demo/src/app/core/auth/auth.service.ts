import { Injectable, computed, signal } from '@angular/core';
import type { Role, User } from './user.model';

const STORAGE_KEY = 'rbac_demo_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(this.read());
  user = computed(() => this._user());
  role = computed<('Guest' | Role)>(() => this._user()?.role ?? 'Guest');

  private read(): User | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as User : null;
  }
  private write(u: User | null) {
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  }

  // Demo login: username + selected role
  async login(username: string, role: Role): Promise<User> {
    const user: User = {
      id: 1, username, role,
      token: btoa(`${username}:${role}:${Date.now()}`)
    };
    this._user.set(user);
    this.write(user);
    return user;
  }

  logout() { this._user.set(null); this.write(null); }

  isLoggedIn(): boolean { return !!this._user(); }

  hasAnyRole(roles: Role[]): boolean {
    const r = this._user()?.role;
    if (!r) return false;
    return roles.includes(r) || this.isSuperior(r, roles);
  }

  // Optional: role hierarchy (SuperAdmin > Admin > User).
  private isSuperior(actual: Role, required: Role[]): boolean {
    const rank: Record<Role, number> = { User: 1, Admin: 2, SuperAdmin: 3 };
    const minRequired = Math.min(...required.map(r => rank[r]));
    return rank[actual] >= minRequired;
  }

  getToken(): string | null { return this._user()?.token ?? null; }
}
