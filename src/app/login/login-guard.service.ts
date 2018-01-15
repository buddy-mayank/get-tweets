import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(public auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }

    this.auth.login();
    return false;
  }
}
