import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss'
})
export class PublicLayoutComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  isLoggedIn = computed(() => this.auth.isLoggedIn());

  goToApp() { this.router.navigateByUrl('/app/dashboard'); }
  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/public');
  }
}
