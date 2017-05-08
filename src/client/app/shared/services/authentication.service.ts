import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Logger } from 'angular2-logger/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { Project } from '../models/project.class';
import { Evaluation } from '../models/evaluation.class';


@Injectable()
export class AuthenticationService {

  public currentUser :BehaviorSubject<any> = new BehaviorSubject(null);
  public redirectUrl :string;
  public accountMetaData :FirebaseObjectObservable<any>;

  constructor(private _af: AngularFire, private _logger :Logger, private _router :Router) {
    this._af.auth.subscribe((auth :any) => {
      this._logger.debug('[AuthenticationService] New Authentication Object', auth);
      this.currentUser.next(auth);
      this.accountMetaData = this._af.database.object('/users/' + auth.uid);
    });
  }
  login(email :string, password :string) {
    let creds: any = { email: email, password: password };
    this._af.auth.login(creds).then((resolve) => {
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
    this._af.auth.createUser(creds).then((resolve) => {
      this._logger.debug('[AuthenticationService] Registration successful!');
      let userObj :any = { 'addedProject': false, 'addedEvaluation': false };
      this._af.database.object('/users').$ref.child(resolve.uid).set(userObj);
    }, (reject) => {
      this._logger.debug('[AuthenticationService] Registration failed', reject);
    });
  }
  logout() {
    this._af.auth.logout();
  }
  updateContributions(contribution :any) {
    let update :any;
    if (contribution instanceof Project) {
      update = { 'addedProject': true };
    }
    if (contribution instanceof Evaluation) {
      update = { 'addedEvaluation': true };
    }
    this.accountMetaData.update(update);
  }

}

