import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { PipesModule } from '../shared/pipes/pipes.module';
import { VisualizationsComponent } from './visulizations.component';
import { VisualizationsRoutingModule } from './visualizations-routing.module';
import { ChartsModule } from 'ng2-charts';
import { ToNumericValuePipe } from '../shared/pipes/toNumericValuePipe';
import { ToStringValuePipe } from '../shared/pipes/toStringValuePipe';
import { GetNamePipe } from '../shared/pipes/getNamePipe';

@NgModule({
  imports: [CommonModule, VisualizationsRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule,
    PipesModule, ChartsModule],
  declarations: [VisualizationsComponent],
  providers: [ToNumericValuePipe, ToStringValuePipe, GetNamePipe],
  exports: [VisualizationsComponent]
})
export class VisualizationsModule { }
