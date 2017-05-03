import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'confirm-delete-dialog',
  template: `
      <h3 md-dialog-title>{{ headline }}</h3>
      <md-dialog-content>
        {{ body }}
      </md-dialog-content>
      <md-dialog-actions class="margin-top-1rem">
        <button md-button (click)="dialogRef.close('cancel')" class="margin-right-1rem margin-left-auto">
          <i class="material-icons md-18">clear</i>
          Cancel
        </button>
        <button md-raised-button color="warn" (click)="dialogRef.close('confirm')">
          <i class="material-icons md-18">delete_forever</i>
          {{ confirmButtonLabel }}
        </button>
      </md-dialog-actions>
  `
})
export class ConfirmDeleteDialogComponent {
  public headline :string;
  public body :string;
  public confirmButtonLabel :string;
  constructor(public dialogRef: MdDialogRef<ConfirmDeleteDialogComponent>) {}
}
