import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

/**
 * This class represents the lazy loaded HeaderComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'header-component',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public currentUser :any;
  private _subscriptions :any;

  constructor(private _authenticationService :AuthenticationService) {}

  ngOnInit() {
    this._subscriptions = this._authenticationService.currentUser.subscribe((newUser) => {
      this.currentUser = newUser;
    });
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
