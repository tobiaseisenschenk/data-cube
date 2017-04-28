import { Component, OnInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

/**
 * This class represents the lazy loaded LoginComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'add-project-component',
  templateUrl: 'add-project.component.html',
  styleUrls: ['add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  public addProjectForm :FormGroup;
  public budgetInput :AbstractControl;
  public degreeOptions :any;
  public filteredOptions :Observable<string[]>;

  constructor(private _logger :Logger,
              private _authenticationService :AuthenticationService,
              private _formbuilder: FormBuilder) {}

  ngOnInit() {
    this.addProjectForm = this._formbuilder.group({
      'budgetInput': ['', Validators.compose([Validators.required])],
    });

    this.budgetInput = this.addProjectForm.controls['budgetInput'];

    this.degreeOptions = [
      'Low',
      'Medium',
      'High'
    ];
    this.filteredOptions = this.budgetInput.valueChanges
      .startWith(null)
      .map(val => val ? this.filter(val) : this.degreeOptions.slice());
  }


  filter(val: string): string[] {
    return this.degreeOptions.filter((option :string) => new RegExp(`^${val}`, 'gi').test(option));
  }
}
