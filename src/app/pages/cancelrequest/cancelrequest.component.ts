import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'cancel-dialog',
  templateUrl: "./cancelrequest.component.html",
  styleUrls: ["./cancelrequest.component.scss"]
})
export class CancelRequestDialog {
   private confirmMessage: string = "Are you sure you want to proceed with this action?";
   private confirmOK: string = "I'm Sure";
   private confirmAbort: string = "Abort";

   constructor(public dialogRef: MdDialogRef<CancelRequestDialog>) {}
}
