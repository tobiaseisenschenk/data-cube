import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Logger } from 'angular2-logger/core';


@Injectable()
export class UXDataService {

  public countries :FirebaseObjectObservable<any>;
  public dev_methods :FirebaseObjectObservable<any>;
  public domains :FirebaseObjectObservable<any>;
  public market_descr :FirebaseObjectObservable<any>;

  constructor(private _af: AngularFire, private _logger :Logger) {
    this.countries = this._af.database.object('/countries');
    this.dev_methods = this._af.database.object('/dev_methods');
    this.domains = this._af.database.object('/domains');
    this.market_descr = this._af.database.object('/market_descr');
  }


}

