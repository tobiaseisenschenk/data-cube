import { Component, OnDestroy, OnInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { UXDataService } from '../shared/services/ux-data.service';
import { Project } from '../shared/models/project.class';

/**
 * This class represents the lazy loaded MyContributionsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'my-contributions-component',
  templateUrl: 'my-contributions.component.html',
  //styleUrls: ['my-contributions.components.css']
})
export class MyContributionsComponent implements OnInit, OnDestroy {

  // Input Fields

  // Data Collections
  public myProjects :any;

  // Subscriptions
  private myProjectsSubscription :any;

  constructor(private _logger :Logger,
              private _authenticationService :AuthenticationService,
              private _uxDataService :UXDataService) {}

  ngOnInit() {
    this.subscribeMyProjects();
  }
  ngOnDestroy() {
    this.myProjectsSubscription.unsubscribe();
  }
  /* UI Functions */

  /* Helper Functions / Data Modification */

  /* Subscriptions */
  subscribeMyProjects() {
    this.myProjectsSubscription = Observable.combineLatest(
      this._uxDataService.projects,
      this._authenticationService.currentUser
    ).subscribe((res :any) => {
      this._logger.debug('[MyContributionsComponent] filtering projects...', res[0], res[1]);
      this.myProjects = res[0]
        .map((proj :any) => new Project(proj))
        .filter((projectObj :Project) => {
        return projectObj.owned_by === res[1].auth.uid;
      });
      this._logger.debug('[MyContributionsComponent] myProjects set', this.myProjects);
    });
  }
}
