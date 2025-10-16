import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth-guard';
import { roleActivateGuard, roleMatchGuard } from './core/auth/role-guard';
import type { Role } from './core/auth/user.model';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'public' },

  {
    path: 'public',
    loadComponent: () => import('./core/layout/public-layout/public-layout').then(m => m.PublicLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./features/public/home/home').then(m => m.HomeComponent) },
      { path: 'login', loadComponent: () => import('./features/public/login/login').then(m => m.LoginComponent) },
      { path: 'forbidden-403', loadComponent: () => import('./features/public/forbidden-403/forbidden-403').then(m => m.Forbidden403Component) },
    ]
  },

  {
    path: 'app',
    canActivate: [authGuard],
    loadComponent: () => import('./core/layout/secure-layout/secure-layout').then(m => m.SecureLayoutComponent),
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/user/dashboard/dashboard').then(m => m.DashboardComponent) },
      { path: 'profile', loadComponent: () => import('./features/user/profile/profile').then(m => m.ProfileComponent) },
      {
        path: 'admin',
        canMatch: [roleMatchGuard],
        data: { roles: ['Admin','SuperAdmin'] as Role[] },
        loadComponent: () => import('./features/admin/admin/admin').then(m => m.AdminComponent)
      },
      {
        path: 'super',
        canActivate: [roleActivateGuard],
        data: { roles: ['SuperAdmin'] as Role[] },
        loadComponent: () => import('./features/super-admin/super-admin/super-admin').then(m => m.SuperAdminComponent)
      },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ]
  },

  { path: '**', redirectTo: 'public' }
];
