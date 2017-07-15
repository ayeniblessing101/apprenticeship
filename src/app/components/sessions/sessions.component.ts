import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import * as moment from 'moment';

import { SessionDetails } from'../../interfaces/session.interface';
import { RateSessionDialogComponent } from './sessions-rating/rating-dialog/rate-session-dialog.component'

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent {
  @Input() updater: string;
  @Input() details: any;
  @Input() loading: any = {};
  @Input() sessions: any[];
  @Input() sessionDetails: SessionDetails;
  @Output() logSession: EventEmitter<any> = new EventEmitter();
  @Output() approveSession: EventEmitter<any> = new EventEmitter();

  constructor(
    private dialog: MdDialog,
    private snackbar: MdSnackBar,
  ) {}

  /**
   * emits logSession event
   *
   * @param {Event} event - log action
   * @return {Null}
   */
  emitLogAction(event): void {
    this.logSession.emit();
  }

  /**
   * emits approveSession event
   *
   * @param {Event} event - update action
   * @return {Null}
   */
  emitApproveAction(sessionId: number): void {
    this.approveSession.emit({ sessionId });
  }

  /**
   * returns the mentorship days left
   *
   * @return {Number}
   */
  getMentorshipDaysLeft(): number {
    const mentorshipEndDate = moment(this.details.match_date).add('months', this.details.duration);
    const daysLeft = Math.floor(mentorshipEndDate.diff(moment(), 'days', true));

    return daysLeft;
  }

  /**
   * checks if mentorship period is over
   *
   * @return {Boolean}
   */
  isMentorshipComplete(): boolean {
    return this.getMentorshipDaysLeft() < 0;
  }

  /**
   * open dialog to rate a logged session
   */
  openRateSessionDialog(session) {
    this.dialog.open(RateSessionDialogComponent, { data: session })
    .afterClosed().toPromise()
    .then((result) => {
      if (result) {
        const session = this.sessions.find(session => session.id === session.id);
        session.rating_count = 1;
      }
    })
  }

}
