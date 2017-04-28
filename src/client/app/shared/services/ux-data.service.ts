import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Logger } from 'angular2-logger/core';


@Injectable()
export class UXDataService {

  public countries :FirebaseObjectObservable<any>;

  constructor(public af: AngularFire, private _logger :Logger) {
    this.countries = this.af.database.object('/countries');
  }


}

