import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private _authService: AuthenticationService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (!!this._authService.currentUser.getValue()) return true;

    // Store the attempted URL for redirecting
    this._authService.redirectUrl = url;
    this._router.navigateByUrl('/login');
    return false;
  }
}
