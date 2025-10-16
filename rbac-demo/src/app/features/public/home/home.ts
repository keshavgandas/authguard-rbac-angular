import { Component, computed, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth';
import { HasRoleDirective } from '../../../shared/directives/has-role';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, HasRoleDirective],
  template: `
  <div class="row">
    <section class="card">
      <ng-container *ngIf="!isLoggedIn(); else logged">
        <h2>This is a Guest page</h2>
        <p>Only public information is visible here. Please sign in to access your dashboard.</p>
        <div class="actions">
          <a routerLink="/public/login"><button>Login</button></a>
        </div>
      </ng-container>

      <ng-template #logged>
        <h2>Welcome back</h2>
        <p>You are logged in as <span class="badge">{{ role() }}</span>.</p>
        <div class="actions">
          <a routerLink="/app/dashboard"><button>Go to Dashboard</button></a>
          <a routerLink="/app/admin" *hasRole="['Admin','SuperAdmin']"><button>Admin</button></a>
          <a routerLink="/app/super" *hasRole="'SuperAdmin'"><button>Super Admin</button></a>
        </div>
      </ng-template>
    </section>
  </div>
  `
})
export class HomeComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  isLoggedIn = computed(() => this.auth.isLoggedIn());
  role = computed(() => this.auth.role());
}
