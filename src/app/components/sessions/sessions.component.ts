import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SessionDetails } from'../../interfaces/session.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent {
  @Input() updater: string;
  @Input() details: any;
  @Input() loading: boolean;
  @Input() sessions: Array<any>;
  @Input() sessionDetails: SessionDetails;
  @Output() logSession: EventEmitter<any> = new EventEmitter();
  @Output() approveSession: EventEmitter<any> = new EventEmitter();

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
    this.approveSession.emit({ sessionId: sessionId });
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

}
