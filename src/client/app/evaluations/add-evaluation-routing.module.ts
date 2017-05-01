import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddEvaluationComponent } from './add-evaluation.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'add-evaluation', component: AddEvaluationComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AddEvaluationRoutingModule { }
