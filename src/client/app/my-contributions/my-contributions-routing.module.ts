import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyContributionsComponent } from './my-contributions.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'my-contributions', component: MyContributionsComponent }
    ])
  ],
  exports: [RouterModule]
})
export class MyContributionsRoutingModule { }
