import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'confirm-delete-dialog',
  template: `    
      <h3 md-dialog-title>{{ headline }}</h3>
      <md-dialog-content>
        {{ body }}
      </md-dialog-content>
      <md-dialog-actions>
        <button md-button (click)="dialogRef.close('cancel')">Cancel</button>
        <button md-button color="warn" (click)="dialogRef.close('confirm')">{{ confirmButtonLabel }}</button>
      </md-dialog-actions>
  
  
  `
})
export class ConfirmDeleteDialogComponent {
  public headline :string;
  public body :string;
  public confirmButtonLabel :string;
  constructor(public dialogRef: MdDialogRef<ConfirmDeleteDialogComponent>) {}
}
