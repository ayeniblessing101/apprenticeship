import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-cancel-dialog',
  templateUrl: './cancelrequest.component.html',
  styleUrls: ['./cancelrequest.component.scss']
})
export class CancelRequestDialogComponent {
   confirmMessage = 'Are you sure you want to proceed with this action?';
   confirmOK = 'Yes I\'m Sure';
   confirmAbort = 'Abort';

   constructor(public dialogRef: MdDialogRef<CancelRequestDialogComponent>) {}
}