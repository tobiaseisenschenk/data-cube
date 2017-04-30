import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { PipesModule } from '../shared/pipes/pipes.module';
import { MyContributionsRoutingModule } from './my-contributions-routing.module';
import { MyContributionsComponent } from './my-contributions.component';

@NgModule({
  imports: [CommonModule, MyContributionsRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule,
    PipesModule],
  declarations: [MyContributionsComponent],
  exports: [MyContributionsComponent]
})
export class MyContributionsModule { }
