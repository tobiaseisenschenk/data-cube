import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddProjectComponent } from './add-project.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'add-project', component: AddProjectComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AddProjectRoutingModule { }
