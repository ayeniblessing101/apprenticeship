import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { SessionService } from '../../../services/session.service';
import { AlertService } from '../../../services/alert.service';
import { MenteeRating } from './../../../interfaces/mentee-rating.interface';
import { MentorRating } from './../../../interfaces/mentor-rating.interface';
import { menteeSessionFormHelper, mentorSessionFormHelper } from '../../../helpers/session-form.helper';

@Component({
  selector: 'app-confirm-session-modal',
  templateUrl: './confirm-session-modal.component.html',
  styleUrls: ['./confirm-session-modal.component.scss'],
})
export class ConfirmSessionModalComponent implements OnInit {
  @Output() emitSessionObject = new EventEmitter<any>();
  @Output() closeConfirmSessionModal = new EventEmitter<string>();
  @Input() request: any;
  @Input() session: any;
  @Input() currentUserId: string;
  @ViewChild('confirmSessionModal') confirmSessionModal: ElementRef;
  confirmSessionForm: FormGroup;
  startTime: string;
  endTime: string;
  readonly ratingScale: number = 5;
  userIsMentor: boolean;


  constructor(
    private sessionService: SessionService,
    private alertService: AlertService,
    private formBuilder: FormBuilder) {
    this.rejectSession = this.rejectSession.bind(this);
  }

  ngOnInit() {
    this.userIsMentor = (this.currentUserId === this.request.mentor.id);
    this.startTime = this.request.pairing.start_time;
    this.endTime = this.request.pairing.end_time;
    const sessionDuration = this.computeSessionDuration(this.startTime, this.endTime);
    const hours = sessionDuration === 1 ? `${sessionDuration} hour` : `${sessionDuration} hours`;

    const sessionFormFields = (this.userIsMentor) ? menteeSessionFormHelper : mentorSessionFormHelper;
    this.confirmSessionForm = this.formBuilder.group(sessionFormFields);
  }

  /**
   * Closes the modal when the area around the modal is clicked
   */
  @HostListener('click')
  onClick() {
    if (!this.confirmSessionModal.nativeElement.contains(event.target)) {
      this.closeConfirmSession();
    }
  }

  /**
   * Confirms already logged session
   *
   * @returns {void}
  */
  confirmSession() {
    const approver = this.session.mentor_logged ?
      this.request.mentee.id : this.request.mentor.id;

    const payload = {
      user_id: approver,
      comment: this.confirmSessionForm.value.comment,
      ratings: this.getRatings(),
      rating_scale: this.ratingScale,
    }
    const message = 'You have successfully accepted the duration for this session.';
    this.sessionService.confirmSession(this.session.id, payload)
      .toPromise()
      .then(() => {
        this.updateAcceptedSession(this.session);
        this.closeConfirmSession();
        return this.alertService.showMessage(message);
      })
      .catch((error) => {
        this.alertService.showMessage(error);
      });
  }

  /**
   * Handles session rejection alert
   *
   * @returns {void}
   */
  confirmSessionRejection() {
    const  alertServiceConfig = {
      abortActionText: 'BACK',
      confirmActionText: 'PROCEED',
      confirmAction: null,
      canDisable: true,
    }
    const message = 'Are you sure you want to reject this session?';
    alertServiceConfig.confirmAction = this.rejectSession;
    alertServiceConfig.confirmActionText = `Reject session`;
    alertServiceConfig.abortActionText = `Back`;
    alertServiceConfig.canDisable = false;

    this.alertService.confirm(message, this, alertServiceConfig)
  }

  /**
   * Rejects logged session
   *
   * @returns {void}
   */
  rejectSession() {
    this.sessionService.rejectSession(this.session.id, this.currentUserId)
      .toPromise()
      .then((response) => {
        this.updateRejectedSession(response);
        this.closeConfirmSession();
        this.alertService.showMessage('You have rejected this session.')
      });
  }

  /**
   * Closes the confirm session modal
   *
   * @returns {void}
  */
  closeConfirmSession() {
    this.closeConfirmSessionModal.emit();
  }

  /**
   * Returns rating values
   *
   *
   * @returns {(MenteeRating | MentorRating)}
   */
  private getRatings(): MenteeRating | MentorRating {
    return this.confirmSessionForm.value;
  }

  /**
   * Computes the duration of a session in hours
   *
   * @param startTime - Session start time
   * @param endTime - Session end time
   *
   * @returns {Object} - A moment object containing the duration in hours
   */
  private computeSessionDuration(startTime, endTime) {
    const timeDifference = moment(endTime, 'hh:mm')
      .diff(moment(startTime, 'hh: mm'));

    return moment.duration(timeDifference).asHours();
  }

/**
 * updates the session object when a session is approved
 *
 * @param {any} session
 * @return {void}
 */
  updateAcceptedSession(session) {
    this.session.id = session.id;
    this.session.approved = true;
    this.emitSessionObject.emit(this.session);
  }

  /**
   * Updates the session object of a rejected session.
   *
   * @param {any} session - The response object of rejected session.
   * @returns {void}
   */
  updateRejectedSession(session) {
    this.session.id = session.id;
    this.session.approved = false;
    this.emitSessionObject.emit(this.session);
  }
}
