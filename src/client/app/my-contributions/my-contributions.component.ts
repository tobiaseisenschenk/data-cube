import { Component, OnDestroy, OnInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { UXDataService } from '../shared/services/ux-data.service';
import { Project } from '../shared/models/project.class';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ConfirmDeleteDialogComponent } from '../shared/components/dialogs/confirmDeleteDialog.component';

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
  public dialogRef :MdDialogRef<ConfirmDeleteDialogComponent>;

  // Data Collections
  public myProjects :Array<Project>;
  public selectedProject :Project;
  public allDomains :Array<any>;
  public allMarketDescr :Array<any>;
  public allCountries :Array<any>;
  public allLanguages: Array<any>;
  public allDevMethods :Array<any>;
  public devProcessMaturityOptions :any;

  // Subscriptions
  private myProjectsSubscription :any;
  private languageSubscription :any;
  private marketDescrSubscription :any;
  private countriesSubscription :any;
  private devMethodsSubscription :any;

  constructor(public confirmDeleteDialog :MdDialog, private _logger :Logger,
              private _authenticationService :AuthenticationService,
              private _uxDataService :UXDataService) {}

  ngOnInit() {
    this.subscribeMyProjects();
    this.subscribeLanguages();
    this.subscribeCountries();
    this.subscribeMarketDescr();
    this.subscribeDevMethods();
    this.devProcessMaturityOptions = [
      {'id': 1, 'name': 'Initial'},
      {'id': 2, 'name': 'Repeatable'},
      {'id': 3, 'name': 'Defined'},
      {'id': 4, 'name': 'Capable'},
      {'id': 5, 'name': 'Efficient'}
    ];
  }
  ngOnDestroy() {
    this.myProjectsSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
    this.marketDescrSubscription.unsubscribe();
    this.countriesSubscription.unsubscribe();
    this.devMethodsSubscription.unsubscribe();
  }
  /* UI Functions */
  selectProject(project :Project) {
    if (this.selectedProject === project) {
      this.selectedProject = undefined;
    } else {
      this.selectedProject = project;
    }
  }
  openConfirmDeleteDialog() {
    this.dialogRef = this.confirmDeleteDialog.open(ConfirmDeleteDialogComponent);
    this.dialogRef.componentInstance.headline = 'Deleting Project';
    this.dialogRef.componentInstance.body =
      `Are you sure you want to delete this project including all its assiciated evaluations?`;
    this.dialogRef.componentInstance.confirmButtonLabel = 'Delete Project';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this._logger.debug('[MyContributionsComponent] deleting project...')
        this.deleteProject();
      }
    });
  }
  /* Helper Functions / Data Modification */
  private deleteProject() {
    // call service here
  }

  /* Subscriptions */
  private subscribeMyProjects() {
    this.myProjectsSubscription = Observable.combineLatest(
      this._uxDataService.projects,
      this._authenticationService.currentUser,
      this._uxDataService.domains
    ).subscribe((res :any) => {
      if (!!res[0] && !!res[1] && !!res[2]) {
        this._logger.debug('[MyContributionsComponent] filtering projects...', res[0], res[1], res[2]);
        this.myProjects = res[0]
          .map((proj :any) => new Project(proj))
          .filter((projectObj :Project) => {
            return projectObj.owned_by === res[1].auth.uid;
          })
          .map((proj :Project) => {
            res[2].forEach((domain :any) => {
              if (proj.domain === domain.id) {
                proj.domainName = domain.name;
              }
            });
            return proj;
          });
        this._logger.debug('[MyContributionsComponent] myProjects set', this.myProjects);
        this.allDomains = res[2];
      }
    });
  }
  private subscribeLanguages() {
    this.languageSubscription = this._uxDataService.languages.subscribe((lang :any) => {
      this.allLanguages = lang;
    });
  }
  private subscribeMarketDescr() {
    this.marketDescrSubscription = this._uxDataService.market_descr.subscribe((marketDescr :any) => {
      this._logger.debug('[MyContributionsComponent] received market descriptions: ', marketDescr);
      this.allMarketDescr = marketDescr;
    });
  }
  private subscribeCountries() {
    this.countriesSubscription = this._uxDataService.countries.subscribe((countries :any) => {
      this._logger.debug('[MyContributionsComponent] received countries: ', countries);
      this.allCountries = countries;
    });
  }
  private subscribeDevMethods() {
    this.devMethodsSubscription = this._uxDataService.dev_methods.subscribe((dev_methods :any) => {
      this._logger.debug('[MyContributionsComponent] received dev_methods: ', dev_methods);
      this.allDevMethods = dev_methods;
    });
  }
}
