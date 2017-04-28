import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProjectComponent } from './add-project.component';
import { AddProjectRoutingModule } from './add-project-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { PipesModule } from '../shared/pipes/pipes.module';

@NgModule({
  imports: [CommonModule, AddProjectRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule,
    PipesModule],
  declarations: [AddProjectComponent],
  exports: [AddProjectComponent]
})
export class AddProjectModule { }
