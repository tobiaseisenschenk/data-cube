import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

/**
 * This class represents the lazy loaded LoginComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'login-component',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  public email :string = '';
  public password :string = '';

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => console.log(auth));
  }

  login() {
    this.af.auth.login({ email: this.email, password: this.password });
  }

  register() {
    let creds: any = { email: this.email, password: this.password };
    this.af.auth.createUser(creds);
  }


}
