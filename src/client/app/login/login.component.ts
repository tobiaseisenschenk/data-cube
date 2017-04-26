import { Component, OnInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { AuthenticationService } from '../shared/services/authentication.service';

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
  public email :string = '';
  public password :string = '';
  public currentUser :any;
  private _subscriptions :any;

  constructor(private _logger :Logger, private _authenticationService :AuthenticationService) {}

  ngOnInit() {
    this._subscriptions = this._authenticationService.currentUser.subscribe((newUser) => {
      this.currentUser = newUser;
    });
  }

  login() {
    this._authenticationService.login(this.email, this.password);
  }

  register() {
    this._authenticationService.register(this.email, this.password);
  }

  logout() {
    this._authenticationService.logout();
  }


}
