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
  public displayLoginError :boolean = false;
  public logPasswordInput :AbstractControl;
  public regEmailInput :AbstractControl;
  public regPasswordInput :AbstractControl;
  public currentUser :any;
  private _subscriptions :any;

  constructor(private _logger :Logger, private _authenticationService :AuthenticationService, private _fb:FormBuilder) {
    this.loginForm = _fb.group({
      'logEmailInput': ['', Validators.compose([Validators.required,
        Validators.pattern('.+@.+\..+')])],
      'logPasswordInput': ['', Validators.compose([Validators.required])]
    });
    this.logEmailInput = this.loginForm.controls['logEmailInput'];
    this.logPasswordInput = this.loginForm.controls['logPasswordInput'];
    this.registerForm = _fb.group({
      'regEmailInput': ['', Validators.compose([Validators.required,
        Validators.pattern('.+@.+\..+')])],
      'regPasswordInput': ['', Validators.compose([Validators.required])]
    });
    this.regEmailInput = this.registerForm.controls['regEmailInput'];
    this.regPasswordInput = this.registerForm.controls['regPasswordInput'];
  }

  ngOnInit() {
    this._subscriptions = this._authenticationService.currentUser.subscribe((newUser) => {
      this.currentUser = newUser;
    });
  }

  login() {
    this._authenticationService.login(this.logEmailInput.value, this.logPasswordInput.value).then((error :any) => {
      this.displayLoginError = true;
    }, () => this.displayLoginError = false);
  }

  register() {
    this._authenticationService.register(this.regEmailInput.value, this.regPasswordInput.value);
  }
}
