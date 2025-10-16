import { Directive, Input, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import type { Role } from '../../core/auth/user.model';

@Directive({ selector: '[hasRole]' })
export class HasRoleDirective {
  private auth = inject(AuthService);
  private tpl = inject(TemplateRef<any>);
  private vcr = inject(ViewContainerRef);
  private required: Role[] = [];

  @Input() set hasRole(roles: Role[] | Role) {
    this.required = Array.isArray(roles) ? roles : [roles];
    this.update();
  }

  constructor() {
    effect(() => { this.update(); }); // react to role changes
  }

  private update() {
    this.vcr.clear();
    if (this.required.length === 0) { this.vcr.createEmbeddedView(this.tpl); return; }
    if (this.auth.hasAnyRole(this.required)) this.vcr.createEmbeddedView(this.tpl);
  }
}
