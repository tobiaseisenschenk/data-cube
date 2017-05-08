import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyContributionsComponent } from './my-contributions.component';
import { LoginGuard } from '../shared/services/login-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'my-contributions', component: MyContributionsComponent, canActivate: [LoginGuard] }
    ])
  ],
  exports: [RouterModule]
})
export class MyContributionsRoutingModule { }
