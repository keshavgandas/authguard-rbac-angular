import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { HasRoleDirective } from '../../../shared/directives/has-role';
import { AuthService } from '../../auth/auth';

@Component({
  selector: 'app-secure-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, HasRoleDirective],
  templateUrl: './secure-layout.html',
  styleUrl: './secure-layout.scss'
})
export class SecureLayoutComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  role = computed(() => this.auth.role());

  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/public'); // ensure instant redirect
  }
}
