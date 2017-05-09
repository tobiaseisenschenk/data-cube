import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UXDataService } from '../shared/services/ux-data.service';
import { ExportComponent } from './export.component';
import { ExportRoutingModule } from './export-routing.module';

@NgModule({
  imports: [ExportRoutingModule, SharedModule],
  declarations: [ExportComponent],
  exports: [ExportComponent],
  providers: [UXDataService]
})
export class ExportModule { }
