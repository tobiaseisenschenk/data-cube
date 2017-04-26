import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Logger } from 'angular2-logger/core';


@Injectable()
export class AuthenticationService {

  public currentUser :ReplaySubject<any> = new ReplaySubject<any>();

  constructor(public af: AngularFire, private _logger :Logger) {
    this.af.auth.subscribe((auth :any) => {
      this._logger.debug('[AuthenticationService] New Authentication Object', auth);
      this.currentUser.next(auth);
    });
  }

  login(email :string, password :string) {
    let creds: any = { email: email, password: password };
    this.af.auth.login(creds);
  }

  register(email :string, password :string) {
    let creds: any = { email: email, password: password };
    this.af.auth.createUser(creds);
  }

  logout() {
    this.af.auth.logout();
  }

}

