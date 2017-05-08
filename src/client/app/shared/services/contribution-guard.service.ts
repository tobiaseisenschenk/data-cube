import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContributionGuard implements CanActivate {
  constructor(private _authService: AuthenticationService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this._authService.accountMetaData) return Observable.of(false);
    return this._authService.accountMetaData.map((metadata :any) => {
      if (metadata.addedProject && metadata.addedEvaluation) return true;
      if (!metadata.addedProject) this._router.navigateByUrl('/add-project');
      if (!metadata.addedEvaluation && metadata.addedProject) this._router.navigateByUrl('/add-evaluation');
      return false;
    });
  }
}
