import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UXDataService } from '../shared/services/ux-data.service';
import { ExportComponent } from './export.component';
import { ExportRoutingModule } from './export-routing.module';
import { MaterialModule } from '@angular/material';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [ExportRoutingModule, MaterialModule, SharedModule],
  declarations: [ExportComponent],
  exports: [ExportComponent],
  providers: [UXDataService, DatePipe]
})
export class ExportModule { }
