import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UXDataService } from '../shared/services/ux-data.service';
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [HomeRoutingModule, SharedModule, MaterialModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [UXDataService]
})
export class HomeModule { }
