import { Component, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss']
})
export class DialogModalComponent {
  title: String;
  message: String;
  subMessage: String;

  constructor(
    public dialogRef: MdDialogRef<DialogModalComponent>
  ) {
    this.title = 'CONFIRMATION';
    this.message = 'Are you sure you want this mentor?';
    this.subMessage = 'This action cannot be reversed';
  }

}
