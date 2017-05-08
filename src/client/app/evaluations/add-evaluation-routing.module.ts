import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddEvaluationComponent } from './add-evaluation.component';
import { LoginGuard } from '../shared/services/login-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'add-evaluation', component: AddEvaluationComponent, canActivate: [LoginGuard] }
    ])
  ],
  exports: [RouterModule]
})
export class AddEvaluationRoutingModule { }
