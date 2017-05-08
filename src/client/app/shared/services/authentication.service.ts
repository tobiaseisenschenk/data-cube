import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Logger } from 'angular2-logger/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';


@Injectable()
export class AuthenticationService {

  public currentUser :BehaviorSubject<any> = new BehaviorSubject(null);
  public redirectUrl :string;

  constructor(public af: AngularFire, private _logger :Logger, private _router :Router) {
    this.af.auth.subscribe((auth :any) => {
      this._logger.debug('[AuthenticationService] New Authentication Object', auth);
      this.currentUser.next(auth);
    });
  }

  login(email :string, password :string) {
    let creds: any = { email: email, password: password };
    this.af.auth.login(creds).then((resolve) => {
      this._logger.debug('[AuthenticationService] Authentication successful! Redirecting...');
      if (!!this.redirectUrl) {
        this._router.navigateByUrl(this.redirectUrl);
        this.redirectUrl = undefined;
      } else this._router.navigateByUrl('/my-contributions');
    }, (reject) => {
      this._logger.debug('[AuthenticationService] Authentication failed');
    });
  }

  register(email :string, password :string) {
    let creds: any = { email: email, password: password };
    this.af.auth.createUser(creds);
  }

  logout() {
    this.af.auth.logout();
  }

}

