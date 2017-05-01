import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEvaluationComponent } from './add-evaluation.component';
import { AddEvaluationRoutingModule } from './add-evaluation-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { PipesModule } from '../shared/pipes/pipes.module';

@NgModule({
  imports: [CommonModule, AddEvaluationRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule,
    PipesModule],
  declarations: [AddEvaluationComponent],
  exports: [AddEvaluationComponent]
})
export class AddEvaluationModule { }
