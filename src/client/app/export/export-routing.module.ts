import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExportComponent } from './export.component';
import { LoginGuard } from '../shared/services/login-guard.service';
import { ContributionGuard } from '../shared/services/contribution-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'export', component: ExportComponent, canActivate: [ContributionGuard, LoginGuard] }
    ])
  ],
  exports: [RouterModule]
})
export class ExportRoutingModule { }
