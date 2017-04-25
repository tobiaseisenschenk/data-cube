import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, LoginRoutingModule, FormsModule, MaterialModule],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
