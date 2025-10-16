import { Component } from '@angular/core';
@Component({
  standalone: true,
  template: `
  <div class="row"><section class="card">
    <h2>403 — Forbidden</h2>
    <p>You don’t have permission to access this page. Try a different role or contact an administrator.</p>
    <div class="actions">
      <a routerLink="/public"><button>Go Home</button></a>
    </div>
  </section></div>
  `
})
export class Forbidden403Component {}
