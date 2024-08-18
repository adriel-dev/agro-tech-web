import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ConfirmationDialogData } from './ConfirmationDialogData';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {}

  onConfirmClick(): void {
    this.dialogRef.close(true);
    if (this.data.onConfirm) {
      this.data.onConfirm();
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
    if (this.data.onCancel) {
      this.data.onCancel();
    }
  }
}
