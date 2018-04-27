import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  HostListener,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SessionService } from '../../../services/session.service';
import { AlertService } from '../../../services/alert.service';
import { Session } from '../../../interfaces/session.interface';
import { MenteeRating } from './../../../interfaces/mentee-rating.interface';
import { MentorRating } from './../../../interfaces/mentor-rating.interface';
import { getRatingValues } from './../../../helpers/session-form.helper';


@Component({
  selector: 'app-log-session',
  templateUrl: './log-session-modal.component.html',
  styleUrls: ['./log-session-modal.component.scss'],
})
export class LogSessionModalComponent implements OnInit {
  @Input() session: any;
  @Input() request: any;
  @Input() currentUserId: string;
  @Output() closeLogSessionModal = new EventEmitter<string>();
  @Output() updateLoggedSession = new EventEmitter<any>();
  readonly ratingScale: number = 5;
  sessionForm: FormGroup;
  timeSlots: string[] = [];
  hoursInSessionTimeDifference: number;
  minutesInSessionTimeDifference: number;
  sessionId: number;
  startTime:  string;
  endTime: string;
  dropdownHeight = '380px';
  userIsMentor: boolean;
  userIsMentee: boolean;
  sessionIsEditable: boolean;
  ratingValues: any;

  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.userIsMentor = (this.currentUserId === this.request.mentor.id);
    this.userIsMentee = (this.currentUserId === this.request.mentee.id);
    this.sessionIsEditable = this.checkSessionIsEditable();
    this.getTimeSlots();
    this.startTime = this.request.pairing.start_time;
    this.endTime = this.request.pairing.end_time;
    this.calculateSessionTimeDifference(this.startTime, this.endTime);

    this.sessionForm = this.formBuilder.group({
      startTime: [this.startTime, [Validators.required]],
      endTime: [this.endTime, [Validators.required]],
      comment: '',
      sessionFormValues: this.formBuilder.group(getRatingValues(this.ratingValues, this.userIsMentor)),
    });

    if (this.sessionIsEditable) {
      this.sessionService.getSession(this.session.id)
      .toPromise()
      .then((response) => {
        this.ratingValues = response.rating.values;
        this.sessionForm.patchValue({
          comment: (response.comments.length > 0) ? response.comments[0].comment : '',
          sessionFormValues: getRatingValues(this.ratingValues, this.userIsMentor),
        });
      });
    }
  }

  /**
   * Picks up click events from the Host Listener to determine if
   * click was outside modal
   *
   * @param event
   */
  @HostListener('click', ['$event'])
  onClick(event) {
    if (event.path[1].localName === 'app-log-session') {
      this.closeSessionModal();
    }
  }

  /**
   * Calculates difference in the time session starts and ends
   *
   * @param startTime - value of the startTime select box
   * @param endTime - value of the endTime select box
   *
   * @return {void}
   */
  calculateSessionTimeDifference(startTime, endTime) {
    this.startTime = startTime ? startTime : this.startTime;
    this.endTime = endTime ? endTime : this.endTime;

    const formattedStartTime = moment(startTime, 'HH:mm');
    const formattedEndTime = moment(endTime, 'HH:mm');

    const timeDifference = moment.utc(formattedEndTime.diff(formattedStartTime))
    .format('HH:mm')
    .split(':')
    .map(Number);

    this.hoursInSessionTimeDifference = timeDifference[0];
    this.minutesInSessionTimeDifference = timeDifference[1];
  }

  /**
   * Checks to see if the session id exists for a Mentorship request if not it creates a new
   * session and logs the session. Otherwise the session will be updated.
   *
   * @return {void}
   */
  createOrLogSession() {
    if (this.session.id === null) {
      const formData = new FormData();
      formData.append('date', this.session.date);
      this.sessionService.createSession(formData, this.request.id)
        .toPromise()
        .then((response) => {
          this.sessionId = response.id;
          this.logSession();
        });
    } else {
      this.logSession();
    }
  }

  /**
   * Logs session for a Mentorship request.
   *
   * @return {void}
   */
  logSession() {
    const { startTime, endTime, sessionFormValues, comment } = this.sessionForm.value;
    if (startTime === endTime) {
      return this.alertService.showMessage('The session start and end times can\'t be the same');
    }
    const sessionPayload: Session = {
      comment,
      date: Date.parse(this.session.date) / 1000,
      start_time: startTime,
      end_time: endTime,
      rating_scale: this.ratingScale,
      rating_values: this.getRatings(),
    };
    this.sessionId = this.sessionId === undefined ? this.session.id : this.sessionId,
      this.sessionService.logSession(sessionPayload, this.request.id, this.sessionId)
        .toPromise()
        .then((response) => {
          const message = (this.sessionIsEditable) ? 'You have successfully edited this session.'
          : 'You have successfully logged this session.';
          this.updateSession(response);
          this.closeSessionModal();
          return this.alertService.showMessage(message);
        })
        .catch((error) => {
          this.alertService.showMessage(error);
        });
  }

  /**
   * Curates a selection of time slots for the start and end time select boxes.
   *
   * @return {void}
   */
  getTimeSlots() {
    const totalTimeSteps = 48;

    if (this.timeSlots.length < totalTimeSteps) {
      const currentTime = moment().startOf('day');

      for (let i = 1; i <= totalTimeSteps; i = i + 1) {
        this.timeSlots.push(currentTime.format('HH:mm'));
        currentTime.add(30, 'm');
      }
    }

  }

  /**
   * Triggers event that closes the log session modal
   *
   * @return {void}
   */
  closeSessionModal() {
    this.closeLogSessionModal.emit();
  }

  /**
   * Triggers event that updates a session that was just logged in the array of sessions.
   *
   * * @param session - updated session.
   *
   * @return {void}
   */
  updateSession(session) {
    this.session.id = session.id;
    this.session.approved = true;
    this.updateLoggedSession.emit(this.session);
  }

  /**
  * Checks if the session is editable
  *
  * @return {void}
  */
  private checkSessionIsEditable(): boolean {
    return ((this.session.mentor_logged && this.userIsMentor && !this.session.mentee_logged) ||
      (this.session.mentee_logged && this.userIsMentee && !this.session.mentor_logged));
  }

  /**
   * Returns rating values
   *
   * @returns {(MenteeRating | MentorRating)}
   */
  private getRatings(): MenteeRating | MentorRating {
    return this.sessionForm.value.sessionFormValues;
  }
}
