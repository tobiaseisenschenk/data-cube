import { Component, OnDestroy, OnInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UXDataService } from '../shared/services/ux-data.service';
import { Evaluation } from '../shared/models/evaluation.class';

/**
 * This class represents the lazy loaded AddEvaluationComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'add-evaluation-component',
  templateUrl: 'add-evaluation.component.html',
  styleUrls: ['add-evaluation.component.css']
})
export class AddEvaluationComponent implements OnInit, OnDestroy {
  public addEvaluationForm :FormGroup;
  // Input Fields
  public devMethodInput :AbstractControl;

  // Data Collections
  public degreeOptions :any;

  private _currentUser :any;
  // Subscriptions


  constructor(private _logger :Logger,
              private _authenticationService :AuthenticationService,
              private _uxDataService :UXDataService,
              private _formbuilder: FormBuilder) {}

  ngOnInit() {
    this.addEvaluationForm = this._formbuilder.group({
      'devMethodInput': ['', Validators.compose([Validators.required])],

    });

    this.devMethodInput = this.addEvaluationForm.controls['devMethodInput'];


    this.degreeOptions = [
      'Low',
      'Medium',
      'High'
    ];

  }
  ngOnDestroy() {
  }
  /* UI Functions */

  /* Helper Functions / Data Modification */
  onSubmit(addEvaluationForm :FormGroup) {

  }
  // check if domain already exists, return its id and add to db

  /* Subscriptions */

}
