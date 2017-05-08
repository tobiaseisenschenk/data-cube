import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddProjectComponent } from './add-project.component';
import { LoginGuard } from '../shared/services/login-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'add-project', component: AddProjectComponent, canActivate: [LoginGuard] }
    ])
  ],
  exports: [RouterModule]
})
export class AddProjectRoutingModule { }
