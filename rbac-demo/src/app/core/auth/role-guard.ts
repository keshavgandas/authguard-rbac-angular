import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth';
import type { Role } from './user.model';

function check(required: Role[] | undefined) {
  const router = inject(Router);
  const auth = inject(AuthService);
  if (!auth.isLoggedIn()) return router.parseUrl('/public/login');
  if (!required || required.length === 0) return true;
  return auth.hasAnyRole(required) ? true : router.parseUrl('/public/forbidden-403');
}

export const roleActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot) =>
  check(route.data?.['roles'] as Role[] | undefined);

export const roleMatchGuard: CanMatchFn = (route) =>
  check((route.data as any)?.['roles'] as Role[] | undefined);
