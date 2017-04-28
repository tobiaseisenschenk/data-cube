import { Component, OnDestroy, OnInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UXDataService } from '../shared/services/ux-data.service';

/**
 * This class represents the lazy loaded LoginComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'add-project-component',
  templateUrl: 'add-project.component.html',
  styleUrls: ['add-project.component.css']
})
export class AddProjectComponent implements OnInit, OnDestroy {
  public addProjectForm :FormGroup;
  // Input Fields
  public devMethodInput :AbstractControl;
  public marketDiversityInput :AbstractControl;
  public budgetInput :AbstractControl;
  public domainInput :AbstractControl;
  public devProcessMaturityInput :AbstractControl;
  public marketDescrInput :AbstractControl;
  // Data Collections
  public degreeOptions :any;
  public devProcessMaturityOptions :any;
  public devMethods :any;
  public domains :any;
  public marketDescr :any;

  private devMethodsSubscription :any;
  private domainsSubscription :any;
  private marketDescrSubscription :any;

  constructor(private _logger :Logger,
              private _authenticationService :AuthenticationService,
              private _uxDataService :UXDataService,
              private _formbuilder: FormBuilder) {}

  ngOnInit() {
    this.subscribeDevMethods();
    this.subscribeDomains();
    this.subscribeMarketDescr();
    this.addProjectForm = this._formbuilder.group({
      'devMethodInput': ['', Validators.compose([Validators.required])],
      'marketDiversityInput': ['', Validators.compose([Validators.required])],
      'budgetInput': ['', Validators.compose([Validators.required])],
      'domainInput': ['', Validators.compose([Validators.required])],
      'devProcessMaturityInput': ['', Validators.compose([Validators.required])],
      'marketDescrInput': ['', Validators.compose([Validators.required])],
    });

    this.devMethodInput = this.addProjectForm.controls['devMethodInput'];
    this.marketDiversityInput = this.addProjectForm.controls['marketDiversityInput'];
    this.budgetInput = this.addProjectForm.controls['budgetInput'];
    this.domainInput = this.addProjectForm.controls['domainInput'];
    this.devProcessMaturityInput = this.addProjectForm.controls['devProcessMaturityInput'];
    this.marketDescrInput = this.addProjectForm.controls['marketDescrInput'];

    this.degreeOptions = [
      'Low',
      'Medium',
      'High'
    ];
    this.devProcessMaturityOptions = [
    {'id': '1', 'name': 'Initial'},
    {'id': '2', 'name': 'Repeatable'},
    {'id': '3', 'name': 'Defined'},
    {'id': '4', 'name': 'Capable'},
    {'id': '5', 'name': 'Efficient'}
    ];
  }
  ngOnDestroy() {
    this.devMethodsSubscription.unsubscribe();
    this.domainsSubscription.unsubscribe();
    this.marketDescrSubscription.unsubscribe();
  }
  /* UI Functions */
  displayNameProp(obj: any): string {
    if(!!obj) {
      return obj.name;
    }
    return '';
  }
  /* Helper Functions / Data Modification */

  /* Subscriptions */
  private subscribeDevMethods() {
    this.devMethodsSubscription = this._uxDataService.dev_methods.subscribe((dev_methods :any) => {
      this._logger.debug('[AddProjectComponent] received dev_methods: ', dev_methods);
      this.devMethods = dev_methods;
    });
  }
  private subscribeDomains() {
    this.domainsSubscription = this._uxDataService.domains.subscribe((domains :any) => {
      this._logger.debug('[AddProjectComponent] received domains: ', domains);
      this.domains = domains;
    });
  }
  private subscribeMarketDescr() {
    this.marketDescrSubscription = this._uxDataService.market_descr.subscribe((marketDescr :any) => {
      this._logger.debug('[AddProjectComponent] received market descriptions: ', marketDescr);
      this.marketDescr = marketDescr;
    });
  }

}
