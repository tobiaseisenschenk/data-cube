import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/add/operator/toPromise';
import { Logger } from 'angular2-logger/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Project } from '../models/project.class';


@Injectable()
export class UXDataService {

  public loading :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public countries :FirebaseListObservable<any>;
  public dev_methods :FirebaseObjectObservable<any>;
  public domains :FirebaseListObservable<any>;
  public market_descr :FirebaseListObservable<any>;
  public languages :FirebaseListObservable<any>;
  public projects :FirebaseListObservable<any>;

  constructor(private _af: AngularFire, private _logger :Logger) {
    this.countries = this._af.database.list('/countries');
    this.dev_methods = this._af.database.object('/dev_methods');
    this.domains = this._af.database.list('/domains');
    this.market_descr = this._af.database.list('/market_descr');
    this.languages = this._af.database.list('/languages');
    this.projects = this._af.database.list('/projects');
  }
  public addProject(project :Project) {
    this._logger.debug('[UXDataService] adding project: ', project);
    this.projects.push(project.toJson());
  }

  public addDomain(domain :any) {
    this.loading.next(true);
    this._logger.debug('[UXDataService] adding domain: ', domain);
    return this.domains.push(domain).then((success :any) => {
      this._logger.debug('[UXDataService] adding domain successful!');
      this.loading.next(false);
    }, (error :Error) => {
      this._logger.debug('[UXDataService] error adding domain!', error);
      this.loading.next(false);
    });
  }

  public addMarketDescr(descr :any) {
    this.loading.next(true);
    this._logger.debug('[UXDataService] adding market description: ', descr);
    return this.market_descr.push(descr).then((success :any) => {
      this._logger.debug('[UXDataService] adding market description successful!');
      this.loading.next(false);
    }, (error :Error) => {
      this._logger.debug('[UXDataService] error adding market description!', error);
      this.loading.next(false);
    });
  }

  public addLanguage(lang :any) {
    this.loading.next(true);
    this._logger.debug('[UXDataService] adding language: ', lang);
    return this.languages.push(lang).then((success :any) => {
      this._logger.debug('[UXDataService] adding language successful!');
      this.loading.next(false);
    }, (error :Error) => {
      this._logger.debug('[UXDataService] error adding language!', error);
      this.loading.next(false);
    });
  }
  public addCountry(coun :any) {
    this.loading.next(true);
    this._logger.debug('[UXDataService] adding country: ', coun);
    return this.countries.push(coun).then((success :any) => {
      this._logger.debug('[UXDataService] adding country successful!');
      this.loading.next(false);
    }, (error :Error) => {
      this._logger.debug('[UXDataService] error adding country!', error);
      this.loading.next(false);
    });
  }
}

