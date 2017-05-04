import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/add/operator/toPromise';
import { Logger } from 'angular2-logger/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Project } from '../models/project.class';
import { Evaluation } from '../models/evaluation.class';
import { Router } from '@angular/router';


@Injectable()
export class UXDataService {

  public loading :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public countries :FirebaseListObservable<any>;
  public dev_methods :FirebaseObjectObservable<any>;
  public domains :FirebaseListObservable<any>;
  public market_descr :FirebaseListObservable<any>;
  public languages :FirebaseListObservable<any>;
  public projects :FirebaseListObservable<any>;
  public evaluations :FirebaseListObservable<any>;
  public projectIdSelectedForEvaluation :BehaviorSubject<number> = new BehaviorSubject(null);
  public evaluationMethods :FirebaseListObservable<any>;


  constructor(private _af: AngularFire, private _logger :Logger, private _router :Router) {
    this.countries = this._af.database.list('/countries');
    this.dev_methods = this._af.database.object('/dev_methods');
    this.domains = this._af.database.list('/domains');
    this.market_descr = this._af.database.list('/market_descr');
    this.languages = this._af.database.list('/languages');
    this.projects = this._af.database.list('/projects', { preserveSnapshot: true });
    this.evaluations = this._af.database.list('/evaluations', { preserveSnapshot: true });
    this.evaluationMethods = this._af.database.list('/eval_methods');
  }
  public addProject(project :Project) {
    this._logger.debug('[UXDataService] adding project: ', project);
    this.projects.push(project.toJson());
    this._router.navigateByUrl('/my-contributions');
  }
  public deleteProject(project :Project) {
    this.projects.remove(project.firebaseRef).then(() => {
      this._router.navigateByUrl('/my-contributions');
    });
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
  public addEvalMethod(method :any) {
    this.loading.next(true);
    this._logger.debug('[UXDataService] adding evaluation method: ', method);
    return this.evaluationMethods.push(method).then((success :any) => {
      this._logger.debug('[UXDataService] adding evaluation method successful!');
      this.loading.next(false);
    }, (error :Error) => {
      this._logger.debug('[UXDataService] error adding evaluation method!', error);
      this.loading.next(false);
    });
  }
  public addEvaluation(evaluation :Evaluation) {
    this.loading.next(true);
    this._logger.debug('[UXDataService] adding evaluation: ', evaluation);
    return this.evaluations.push(evaluation.toJson()).then((success :any) => {
      this._logger.debug('[UXDataService] adding evaluation successful!');
      this.loading.next(false);
      this.projectIdSelectedForEvaluation.next(null);
      this._router.navigateByUrl('/my-contributions');
    }, (error :Error) => {
      this._logger.debug('[UXDataService] error adding evaluation!', error);
      this.loading.next(false);
    });
  }
  public deleteEvaluation(evaluation :Evaluation) {
    this.evaluations.remove(evaluation.firebaseRef);
  }
}

