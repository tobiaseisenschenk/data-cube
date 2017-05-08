import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VisualizationsComponent } from './visulizations.component';
import { LoginGuard } from '../shared/services/login-guard.service';
import { ContributionGuard } from '../shared/services/contribution-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'visualizations', component: VisualizationsComponent, canActivate: [ContributionGuard, LoginGuard] }
    ])
  ],
  exports: [RouterModule]
})
export class VisualizationsRoutingModule { }
