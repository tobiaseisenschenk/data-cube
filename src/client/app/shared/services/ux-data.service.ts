import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Logger } from 'angular2-logger/core';


@Injectable()
export class UXDataService {

  public something :ReplaySubject<any> = new ReplaySubject<any>();

  constructor(public af: AngularFire, private _logger :Logger) {
    //this.af.database
  }


}

