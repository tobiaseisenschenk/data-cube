import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProjectComponent } from './add-project.component';
import { AddProjectRoutingModule } from './add-project-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, AddProjectRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: [AddProjectComponent],
  exports: [AddProjectComponent]
})
export class AddProjectModule { }
