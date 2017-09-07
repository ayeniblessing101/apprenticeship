import { Component } from '@angular/core';
import { MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-reject-session',
  templateUrl: './reject-session-dialog.component.html',
  styleUrls: ['./reject-session-dialog.component.scss']
})
export class RejectSessionDialogComponent {
  title: String;
  text: String;
  subText: String;

  constructor(
    public dialogRef: MdDialogRef<RejectSessionDialogComponent>,
  ) {
    this.title = 'CONFIRMATION';
    this.text = 'Are you sure you want to reject this session?';
    this.subText = 'This action cannot be reversed';
  }
}
