import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { PipesModule } from '../shared/pipes/pipes.module';
import { VisualizationsComponent } from './visulizations.component';
import { VisualizationsRoutingModule } from './visualizations-routing.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [CommonModule, VisualizationsRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule,
    PipesModule, ChartsModule],
  declarations: [VisualizationsComponent],
  exports: [VisualizationsComponent]
})
export class VisualizationsModule { }
