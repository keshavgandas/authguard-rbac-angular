import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth';
import type { Role } from '../../../core/auth/user.model';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <h2>Login</h2>
  <form (ngSubmit)="submit()" class="form">
    <label>Username</label>
    <input [(ngModel)]="username" name="username" required />
    <label>Role</label>
    <select [(ngModel)]="role" name="role" required>
      <option value="User">User</option>
      <option value="Admin">Admin</option>
      <option value="SuperAdmin">SuperAdmin</option>
    </select>
    <button type="submit">Sign in</button>
  </form>
  `,
  styles:[`.form{display:flex;flex-direction:column;gap:10px;max-width:320px}`]
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  username = '';
  role: Role = 'User';

  async submit(){
    await this.auth.login(this.username, this.role);
    if (this.role === 'SuperAdmin') this.router.navigateByUrl('/app/super');
    else if (this.role === 'Admin') this.router.navigateByUrl('/app/admin');
    else this.router.navigateByUrl('/app/dashboard');
  }

}
