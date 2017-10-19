import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-cancel-dialog',
  templateUrl: './cancel-request.component.html',
  styleUrls: ['./cancel-request.component.scss'],
})
export class CancelRequestDialogComponent {
  message = 'Are you sure you want to cancel this mentorship request?';
  ok = 'Yes I\'m Sure';
  abort = 'Abort';

  cancellationReason: string;

  constructor(public dialogRef: MdDialogRef<CancelRequestDialogComponent>) {}

  closeDialog(action: boolean) {
    this.dialogRef.close(
      { action, reason: this.cancellationReason },
      );
  }
}
