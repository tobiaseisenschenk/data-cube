import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VisualizationsComponent } from './visulizations.component';
import { LoginGuard } from '../shared/services/login-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'visualizations', component: VisualizationsComponent, canActivate: [LoginGuard] }
    ])
  ],
  exports: [RouterModule]
})
export class VisualizationsRoutingModule { }
