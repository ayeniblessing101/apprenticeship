import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import * as moment from 'moment';

import { SessionDetails } from '../../interfaces/session.interface';
import { RateSessionDialogComponent } from './sessions-rating/rating-dialog/rate-session-dialog.component'
import { RejectSessionDialogComponent } from './reject-session/reject-session-dialog.component'

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
  @Output() rejectSession: EventEmitter<any> = new EventEmitter();

  constructor(
    private dialog: MdDialog,
    private snackbar: MdSnackBar,
  ) { }

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
   * emits rejectSession event
   *
   * @param {Number} sessionId - ID of the session to be rejected
   *
   * @return {void}
   */
  emitRejectAction(sessionId: number): void {
    this.rejectSession.emit({ sessionId });
  }

  /**
   * open dialog to reject a logged session
   */
  openRejectSessionDialog(sessionId: number) {
    const dialogRef = this.dialog.open(RejectSessionDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.emitRejectAction(sessionId);
    });
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
    if (session.mentee_approved) {
      this.dialog.open(RateSessionDialogComponent, { data: session })
        .afterClosed().toPromise()
        .then((result) => {
          if (result) {
            const ratedSession = this.sessions.find(loopSession => loopSession.id === session.id);
            ratedSession.rating_count = 1;
          }
        })
    } else {
      this.snackbar.open('Please approve the session first', 'Close', { duration: 3000 });
    }
  }
}
