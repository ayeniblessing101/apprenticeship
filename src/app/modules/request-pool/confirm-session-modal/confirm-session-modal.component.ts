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
import { getRatingValues } from '../../../helpers/session-form.helper';
import { NotificationService } from '../../../services/notifications.service';
import { UserService } from '../../../services/user.service';
import { NotificationTypes } from '../../../enums/notification-types.enum';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-confirm-session-modal',
  templateUrl: './confirm-session-modal.component.html',
  styleUrls: ['./confirm-session-modal.component.scss'],
})
export class ConfirmSessionModalComponent implements OnInit {
  @Input() request: any;
  @Input() session: any;
  @Input() currentUserId: string;
  @Output() emitSessionObject = new EventEmitter<any>();
  @Output() closeConfirmSessionModal = new EventEmitter<string>();
  @ViewChild('confirmSessionModal') confirmSessionModal: ElementRef;
  confirmSessionForm: FormGroup;
  startTime: string;
  endTime: string;
  readonly ratingScale: number = 5;
  userIsMentor: boolean;
  ratingValues: any;
  sessionDuration: any;
  currentUser: any;

  constructor(
    private sessionService: SessionService,
    private alertService: AlertService,
    private notificationService: NotificationService,
    private userService: UserService,
    private formBuilder: FormBuilder) {
    this.rejectSession = this.rejectSession.bind(this);
  }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.userIsMentor = (this.currentUserId === this.request.mentor.id);
    this.startTime = this.request.pairing.start_time;
    this.endTime = this.request.pairing.end_time;
    this.sessionDuration = this.computeSessionDuration(this.startTime, this.endTime);

    this.confirmSessionForm = this.formBuilder.group({
      comment: '',
      sessionFormValues : this.formBuilder.group(getRatingValues(this.ratingValues, this.userIsMentor)),
    });
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
    return this.confirmSessionForm.value.sessionFormValues;
  }

  /**
   * Computes the duration of a session in hours
   *
   * @param startTime - Session start time
   * @param endTime - Session end time
   *
   * @returns {Object} - A moment object containing the duration
   */
  private computeSessionDuration(startTime, endTime) {
    const timeDifference = moment(endTime, 'hh:mm')
      .diff(moment(startTime, 'hh: mm'));

    const sessionTimeDifference = moment.duration(timeDifference);
    return this.formatSessionDuration(sessionTimeDifference);

  }

  /**
  * Formats the session duration to a more readable format
  *
  * @param sessionTimeDifference
  *
  * @returns {String}
  */
  private formatSessionDuration(sessionTimeDifference) {
    const hours = Math.floor(sessionTimeDifference.asHours());
    const minutes = sessionTimeDifference.minutes();

    const readableHours = `${hours} ${hours > 1 ? 'hours' : 'hour'}`;
    const readableMinutes = ` ${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`;

    let result = '';
    result +=  hours > 0 ? readableHours : '';
    result += minutes > 0 ? readableMinutes : '';

    return result.trim();
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
    const notificationType =  (this.userIsMentor) ? NotificationTypes.MENTOR_CONFIRMS : NotificationTypes.MENTEE_CONFIRMS;
    const notificationMessage = {
      title: (this.userIsMentor) ? 'Mentor Confirms Session' : 'Mentee Confirms Session',
      content: `${this.currentUser.firstName} just confirmed your session for ${this.sessionDuration} on ${this.session.date}.`,

    };
    this.sendNotification(notificationType, notificationMessage);
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
    const notificationType = (this.userIsMentor) ? NotificationTypes.MENTOR_REJECTS : NotificationTypes.MENTEE_REJECTS;
    const notificationMessage = {
      title: (this.userIsMentor) ? 'Mentor Rejects Session' : 'Mentee Rejects Session',
      content: `${this.currentUser.firstName} just rejected your session for ${this.sessionDuration} on ${this.session.date}.`,
    };
    this.sendNotification(notificationType, notificationMessage);
  }

  /**
   * Notification payload
   *
   * @param {any} type
   * @param {any} message
   * @returns {void}
   */
  sendNotification(type, message) {
    const userRole = (this.userIsMentor) ? 'mentee' : 'mentor';
    const payload = {
      type,
      message,
      id: this.request[userRole].id,
      sender: this.currentUser.name,
      timestamp: Date.now(),
    }
    return this.notificationService.sendMessage([payload.id], payload);
  }
}
