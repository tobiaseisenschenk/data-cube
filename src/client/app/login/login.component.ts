import { Component, OnInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * This class represents the lazy loaded LoginComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'login-component',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm :FormGroup;
  public registerForm :FormGroup;
  public logEmailInput :AbstractControl;
  public logPasswordInput :AbstractControl;
  public regEmailInput :AbstractControl;
  public regPasswordInput :AbstractControl;
  public currentUser :any;
  private _subscriptions :any;

  constructor(private _logger :Logger, private _authenticationService :AuthenticationService, private _fb:FormBuilder) {
    this.loginForm = _fb.group({
      'emailInput': ['', Validators.compose([Validators.required,
        Validators.pattern('.+@.+\..+')])],
      'passwordInput': ['', Validators.compose([Validators.required])]
    });
    this.logEmailInput = this.loginForm.controls['emailInput'];
    this.logPasswordInput = this.loginForm.controls['passwordInput'];
    this.registerForm = _fb.group({
      'emailInput': ['', Validators.compose([Validators.required])],
      'passwordInput': ['', Validators.compose([Validators.required,
        Validators.pattern('.+@.+\..+')])]
    });
    this.regEmailInput = this.registerForm.controls['emailInput'];
    this.regPasswordInput = this.registerForm.controls['passwordInput'];
  }

  ngOnInit() {
    this._subscriptions = this._authenticationService.currentUser.subscribe((newUser) => {
      this.currentUser = newUser;
    });
  }

  login() {
    this._authenticationService.login(this.logEmailInput.value, this.logPasswordInput.value);
  }

  register() {
    this._authenticationService.register(this.regEmailInput.value, this.regPasswordInput.value);
  }
}
