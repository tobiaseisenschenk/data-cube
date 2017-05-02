import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { LoginModule } from './login/login.module';
import { MaterialRootModule, MdDialogModule } from '@angular/material';
import { LOG_LOGGER_PROVIDERS } from 'angular2-logger/core';
import 'hammerjs';
import { AuthenticationService } from './shared/services/authentication.service';
import { RouterModule } from '@angular/router';
import { AddProjectModule } from './projects/add-project.module';
import { PipesModule } from './shared/pipes/pipes.module';
import { MyContributionsModule } from './my-contributions/my-contributions.module';
import { DialogModule } from './shared/components/dialogs/dialog.module';
import { AddEvaluationModule } from './evaluations/add-evaluation.module';


const firebaseConfig = {
  apiKey: 'AIzaSyBJT02unR3eVODlTyYyZCn3vaKeVCZD2vw',
  authDomain: 'data-cube.firebaseapp.com',
  databaseURL: 'https://data-cube.firebaseio.com',
  projectId: 'data-cube',
  storageBucket: 'data-cube.appspot.com',
  messagingSenderId: '825001931253'
};
const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  imports: [AddProjectModule, AddEvaluationModule, BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    DialogModule, MdDialogModule, HttpModule, AppRoutingModule, AboutModule, HomeModule, LoginModule,
    SharedModule.forRoot(), MaterialRootModule, MyContributionsModule, PipesModule, RouterModule],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  },
    LOG_LOGGER_PROVIDERS, AuthenticationService],
  bootstrap: [AppComponent]

})
export class AppModule { }
