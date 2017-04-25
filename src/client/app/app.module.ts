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
import { MaterialRootModule } from '@angular/material';

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
  imports: [BrowserModule, AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    HttpModule, AppRoutingModule, AboutModule, HomeModule, LoginModule, SharedModule.forRoot(), MaterialRootModule],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})
export class AppModule { }
