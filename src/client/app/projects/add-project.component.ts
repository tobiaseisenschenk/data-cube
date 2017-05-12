import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UXDataService } from '../shared/services/ux-data.service';
import { Project } from '../shared/models/project.class';
import { Router } from '@angular/router';

/**
 * This class represents the lazy loaded AddProjectComponent.
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
  public productComplexityInput :AbstractControl;
  public teamSizeInput :AbstractControl;
  public timeInput :AbstractControl;
  public userAgeInput :AbstractControl;
  public userDiversityInput :AbstractControl;
  public userExpertiseInput :AbstractControl;
  public countryInput :AbstractControl;
  public languageInput :AbstractControl;
  // Data Collections
  public degreeOptions :any;
  public devProcessMaturityOptions :any;
  public devMethods :any;
  public domains :any;
  public marketDescr :any;
  public selectedDescriptions :Array<any>;
  public languages :any;
  public selectedLanguages :Array<any>;
  public countries :any;
  public selectedCountries :Array<any>;
  private _currentUser :any;
  private _newProjectId :number;
  // Subscriptions
  private devMethodsSubscription :any;
  private domainsSubscription :any;
  private marketDescrSubscription :any;
  private userSubscription :any;
  private languagesSubscription :any;
  private countriesSubscription :any;
  private projectsSubscription :any;

  constructor(private _logger :Logger,
              private _authenticationService :AuthenticationService,
              private _uxDataService :UXDataService,
              private _formbuilder: FormBuilder,
              private _cdRef :ChangeDetectorRef,
              private _router :Router) {}

  ngOnInit() {
    this.subscribeDevMethods();
    this.subscribeDomains();
    this.subscribeMarketDescr();
    this.subscribeCurrentUser();
    this.subscribeLanguages();
    this.subscribeCountries();
    this.subscribeProjects();
    this.addProjectForm = this._formbuilder.group({
      'devMethodInput': ['', Validators.compose([Validators.required, this.devMethodValidator])],
      'marketDiversityInput': ['', Validators.compose([Validators.required])],
      'budgetInput': ['', Validators.compose([Validators.required])],
      'domainInput': ['', Validators.compose([Validators.required])],
      'devProcessMaturityInput': ['', Validators.compose([Validators.required])],
      'marketDescrInput': ['', Validators.compose([Validators.required])],
      'productComplexityInput': ['', Validators.compose([Validators.required])],
      'teamSizeInput': ['', Validators.compose([Validators.required])],
      'timeInput': ['', Validators.compose([Validators.required])],
      'userAgeInput': ['', Validators.compose([Validators.required])],
      'userDiversityInput': ['', Validators.compose([Validators.required])],
      'userExpertiseInput': ['', Validators.compose([Validators.required])],
      'countryInput': ['', Validators.compose([])],
      'languageInput': ['', Validators.compose([])],
    });

    this.devMethodInput = this.addProjectForm.controls['devMethodInput'];
    this.marketDiversityInput = this.addProjectForm.controls['marketDiversityInput'];
    this.budgetInput = this.addProjectForm.controls['budgetInput'];
    this.domainInput = this.addProjectForm.controls['domainInput'];
    this.devProcessMaturityInput = this.addProjectForm.controls['devProcessMaturityInput'];
    this.marketDescrInput = this.addProjectForm.controls['marketDescrInput'];
    this.productComplexityInput = this.addProjectForm.controls['productComplexityInput'];
    this.teamSizeInput = this.addProjectForm.controls['teamSizeInput'];
    this.timeInput = this.addProjectForm.controls['timeInput'];
    this.userAgeInput = this.addProjectForm.controls['userAgeInput'];
    this.userDiversityInput = this.addProjectForm.controls['userDiversityInput'];
    this.userExpertiseInput = this.addProjectForm.controls['userExpertiseInput'];
    this.countryInput = this.addProjectForm.controls['countryInput'];
    this.languageInput = this.addProjectForm.controls['languageInput'];

    this.degreeOptions = UXDataService.degreeOptions;
    this.devProcessMaturityOptions = UXDataService.devProcessMaturityOptions;
    this.selectedDescriptions = [];
    this.selectedLanguages = [];
    this.selectedCountries = [];
  }
  ngOnDestroy() {
    this.devMethodsSubscription.unsubscribe();
    this.domainsSubscription.unsubscribe();
    this.marketDescrSubscription.unsubscribe();
    this.languagesSubscription.unsubscribe();
    this.countriesSubscription.unsubscribe();
    this.projectsSubscription.unsubscribe();
  }
  /* UI Functions */
  displayNameProp(obj: any): string {
    if(!!obj) {
      return obj.name;
    }
    return '';
  }
  // In Case the user provides their own descriptions
  checkMarketDescrInput() {
    let descrExists :boolean = false;
    if (typeof this.marketDescrInput.value === 'string') {
      this.selectedDescriptions.forEach((descr :any) => {
        if (descr.name.toLowerCase().includes(this.marketDescrInput.value.toLowerCase())) {
          descrExists = true;
        }
      });
      if (!descrExists) {
        this.marketDescr.forEach((descr :any) => {
          if (!!this.marketDescrInput.value) {
            if (descr.name.toLowerCase().includes(this.marketDescrInput.value.toLowerCase())) {
              this._logger.debug('[AddProjectComponent] market description already exists!');
              this.selectedDescriptions.push(descr);
              descrExists = true;
              this.marketDescrInput.reset();
            }
          }
        });
      }
      if (!descrExists) {
        this._logger.debug('[AddProjectComponent] adding new market description...');
        let newDescr = { 'id': this.marketDescr.length + 1, 'name': this.marketDescrInput.value.toLowerCase() };
        this.selectedDescriptions.push(newDescr);
        this._uxDataService.addMarketDescr(newDescr);
        this.marketDescrInput.reset();
      }
    }
  }
  selectDescr(descrObj :any) {
    if (!descrObj) return;
    let descrExists :boolean = false;
    this.selectedDescriptions.forEach(descr => {
      if (descr.name.includes(descrObj.name)) descrExists = true;
    });
    if (!descrExists) {
      this.selectedDescriptions.push(descrObj);
      this._cdRef.detectChanges();
    }
  }
  deselectDescr(descrObj :any) {
    if (!descrObj) return;
    this.selectedDescriptions = this.selectedDescriptions.filter((Obj :any) => {
      return descrObj.id !== Obj.id;
    });
  }
  checkLanguageInput() {
    let lanExists :boolean = false;
    if (typeof this.languageInput.value === 'string') {
      this.selectedLanguages.forEach((lang :any) => {
        if (lang.name.toLowerCase().includes(this.languageInput.value.toLowerCase())) {
          lanExists = true;
        }
      });
      if (!lanExists) {
        this.languages.forEach((lan :any) => {
          if (!!this.languageInput.value) {
            if (lan.name.toLowerCase().includes(this.languageInput.value.toLowerCase())) {
              this._logger.debug('[AddProjectComponent] language already exists!');
              this.selectedLanguages.push(lan);
              lanExists = true;
              this.languageInput.reset();
            }
          }
        });
      }
      if (!lanExists) {
        this._logger.debug('[AddProjectComponent] adding new language...');
        let newLanguage = { 'id': this.languages.length + 1, 'name': this.languageInput.value.toLowerCase() };
        this.selectedLanguages.push(newLanguage);
        this._uxDataService.addLanguage(newLanguage);
        this.languageInput.reset();
      }
    }
  }
  selectLanguage(languageObj :any) {
    if (!languageObj) return;
    let langExists :boolean = false;
    this.selectedLanguages.forEach(lang => {
      if (lang.name.includes(languageObj.name)) langExists = true;
    });
    if (!langExists) {
      this.selectedLanguages.push(languageObj);
      this._cdRef.detectChanges();
    }
  }
  deselectLanguage(languageObj :any) {
    if (!languageObj) return;
    this.selectedLanguages = this.selectedLanguages.filter((Obj :any) => {
      return languageObj.id !== Obj.id;
    });
  }
  checkCountryInput() {
    let countryExists :boolean = false;
    if (typeof this.countryInput.value === 'string') {
      this.selectedCountries.forEach((coun :any) => {
        if (coun.name.toLowerCase().includes(this.countryInput.value.toLowerCase())) {
          countryExists = true;
        }
      });
      if (!countryExists) {
        this.countries.forEach((coun :any) => {
          if (!!this.countryInput.value) {
            if (coun.name.toLowerCase().includes(this.countryInput.value.toLowerCase())) {
              this._logger.debug('[AddProjectComponent] country already exists!');
              this.selectedCountries.push(coun);
              countryExists = true;
              this.countryInput.reset();
            }
          }
        });
      }
      if (!countryExists) {
        this._logger.debug('[AddProjectComponent] we discovered a new country ;-)');
        let newCountry = { 'id': this.countries.length + 1, 'name': this.countryInput.value.toLowerCase() };
        this.selectedCountries.push(newCountry);
        this._uxDataService.addCountry(newCountry);
        this.countryInput.reset();
      }
    }
  }
  selectCountry(countryObj :any) {
    if (!countryObj) return;
    let countryExists :boolean = false;
    this.selectedCountries.forEach(coun => {
      if (coun.name.includes(countryObj.name)) countryExists = true;
    });
    if (!countryExists) {
      this.selectedCountries.push(countryObj);
      this._cdRef.detectChanges();
    }
  }
  deselectCountry(countryObj :any) {
    if (!countryObj) return;
    this.selectedCountries = this.selectedCountries.filter((Obj :any) => {
      return countryObj.id !== Obj.id;
    });
  }
  /* Helper Functions / Data Modification */
  onSubmit(addProjectForm :FormGroup) {
    // clear the fields in case the user did not press enter after typing
    this.checkMarketDescrInput();
    this.checkLanguageInput();
    this.checkCountryInput();
    let newProjectObj = new Project({ 'owned_by': this._currentUser.auth.uid, 'id': this._newProjectId });
    newProjectObj.budget = this.budgetInput.value;
    newProjectObj.dev_method = this.devMethodInput.value.id;
    newProjectObj.domain = this.checkDomainInput();
    newProjectObj.product_complexity = this.productComplexityInput.value;
    newProjectObj.team_size = this.teamSizeInput.value;
    newProjectObj.time = this.timeInput.value;
    newProjectObj.user_avg_age = this.userAgeInput.value;
    newProjectObj.user_expertise = this.userExpertiseInput.value;
    newProjectObj.user_diversity = this.userDiversityInput.value;
    newProjectObj.date_shared = new Date();
    newProjectObj.dev_process_maturity = this.devProcessMaturityInput.value;
    newProjectObj.market_descr = [];
    this.selectedDescriptions.forEach((descrObj) => {
      newProjectObj.market_descr.push(descrObj.id);
    });
    newProjectObj.market_diversity = this.marketDiversityInput.value;
    newProjectObj.user_languages = [];
    this.selectedLanguages.forEach((language) => {
      newProjectObj.user_languages.push(language.id);
    });
    newProjectObj.user_location =[];
    this.selectedCountries.forEach((country) => {
      newProjectObj.user_location.push(country.id);
    });
    this._uxDataService.addProject(newProjectObj).then((resolve) => {
      this._authenticationService.updateContributions(newProjectObj);
      this._router.navigateByUrl('/my-contributions');
    }, (reject) => {
      this._logger.debug('[AddProjectComponent] Adding project failed', reject);
    });
  }
  // check if domain already exists, return its id and add to db
  private checkDomainInput() :number {
    let domainExists :boolean = false;
    let domainId :number;
    if (typeof this.domainInput.value === 'string') {
      this.domains.forEach((domainObj :any) => {
        if (domainObj.name === this.domainInput.value) {
          this._logger.debug('[AddProjectComponent] domain already exists!', domainObj.id);
          domainExists = true;
          domainId = domainObj.id;
        }
      });
      if (!domainExists) {
        let newDomainObj = { 'id': this.domains.length + 1, 'name': this.domainInput.value };
        this._uxDataService.addDomain(newDomainObj);
        return this.domains.length;
      }
    } else {
      domainId = this.domainInput.value.id;
    }
    return domainId;
  }
  private devMethodValidator(control: FormControl) {
    // checks if user typed something or selected a value from the list
    if (typeof control.value === 'string') {
      return { 'invalidContent': true };
    } else {
      return null;
    }
  }
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
  private subscribeCurrentUser() {
    this.userSubscription = this._authenticationService.currentUser.subscribe((user :any) => {
      this._logger.debug('[AddProjectComponent] received current user: ', user);
      this._currentUser = user;
    });
  }
  private subscribeLanguages() {
    this.languagesSubscription = this._uxDataService.languages.subscribe((languages :any) => {
      this._logger.debug('[AddProjectComponent] received languages: ', languages);
      this.languages = languages;
    });
  }
  private subscribeCountries() {
    this.countriesSubscription = this._uxDataService.countries.subscribe((countries :any) => {
      this._logger.debug('[AddProjectComponent] received countries: ', countries);
      this.countries = countries;
    });
  }
  // in order to compute the correct 'consecutive' id for the new project
  private subscribeProjects() {
    this.projectsSubscription = this._uxDataService.projects.subscribe((snapshots :any) => {
      /* 1. Get the value (actual evaluation in JSON form) from the snapshot
       2. Get the evaluations id property
       3. Use Math.max.apply to iterate through the array of Ids and find a maximum value
       4. Add 1 for the next higher Id to use
       */
      this._newProjectId = Math.max.apply(Math, snapshots.map((snapshot :any) => snapshot.val().id)) + 1;
    });
  }
}
