import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VisualizationsComponent } from './visulizations.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'visualizations', component: VisualizationsComponent }
    ])
  ],
  exports: [RouterModule]
})
export class VisualizationsRoutingModule { }
