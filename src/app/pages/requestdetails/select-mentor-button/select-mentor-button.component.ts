import { Component, Input } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RequestService } from '../../../services/request.service';

import { DialogModalComponent } from '../../../components/dialog-modal/dialog-modal.component';

@Component({
  selector: 'app-select-mentor-button',
  templateUrl: './select-mentor-button.component.html',
  styleUrls: ['./select-mentor-button.component.scss']
})

export class SelectMentorButtonComponent {
  @Input() details: any;
  @Input() mentor: any;
  @Input() userId: any;
  @Input() loading: any = {};
  @Input() currentMentorButton: string = '';
  snackBarConfig: any;
  requestId: number;

  constructor(
    private dialog: MdDialog,
    private snackbar: MdSnackBar,
    private router: Router,
    private auth: AuthService,
    private requestService: RequestService,
  ) {
    this.loading = {};
    this.snackBarConfig = { duration: 3000 };
  }

  /**
   * Opens dialog modal and triggers selectMentor() once
   * it is closed
   *
   * @param {Object} mentor - mentor detail object
   * @return {Null}
   */
  openModal(mentor: Object) {
    const dialogRef = this.dialog.open(DialogModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.selectMentor(mentor);
    });
  }

  /**
   * This captures the mentor details, and updates the request
   * by calling the matchMenteeRequest method from request service
   * which passes the updated information to the API
   *
   * @param {Object} mentor
   * @return {Null}
   */
  selectMentor(mentor: any): void {
    const currentDate = Math.ceil(Date.now() / 1000);
    this.requestId = this.details.id;
    this.loading.selectMentor = true;
    this.currentMentorButton = mentor.name;
    let message;
    const requestUpdate = {
      mentor_id: mentor.id,
      mentee_name: this.auth.userInfo.name,
      match_date: currentDate,
    };

    this.requestService.matchMenteeRequest(this.requestId, requestUpdate)
      .toPromise()
      .then((res) => {
        this.loading.selectMentor = false;
        message = `Thank you. You have been matched with ${mentor['name']}!`;
        this.openSnackBar(message)
          .afterDismissed()
          .subscribe(() => {
            window.location.reload();
          });
      })
      .catch((error) => {
        this.loading.selectMentor = false;
        message = 'Failed to Match Request! Try again.';
        this.openSnackBar(message);
      });
  }

  /**
   * opens snackbar
   *
   * @param {Boolean} status
   * @return {Null}
   */
  private openSnackBar(message: string): any {
    return this.snackbar
      .open(message, 'close', this.snackBarConfig)
  }
}
