import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ConfirmDeleteDialogComponent } from './confirmDeleteDialog.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [ConfirmDeleteDialogComponent],
  entryComponents: [ConfirmDeleteDialogComponent],
  exports: [ConfirmDeleteDialogComponent]
})
export class DialogModule { }
