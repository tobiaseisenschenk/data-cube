import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginGuard } from './shared/services/login-guard.service';

@NgModule({
  imports: [
    RouterModule.forRoot([
      /* define app module routes here, e.g., to lazily load a module
         (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
       */
    ])
  ],
  providers: [LoginGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }

