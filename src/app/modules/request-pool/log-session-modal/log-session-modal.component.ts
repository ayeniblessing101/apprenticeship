import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  HostListener,
  ElementRef,
  ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SessionService } from '../../../services/session.service';
import { AlertService } from '../../../services/alert.service';
import { Session } from '../../../interfaces/session.interface';
import { Rating } from '../../../interfaces/rating.interface';

@Component({
  selector: 'app-log-session',
  templateUrl: './log-session-modal.component.html',
  styleUrls: ['./log-session-modal.component.scss'],
})
export class LogSessionModalComponent implements OnInit {
  @Output() closeLogSessionModal = new EventEmitter<string>();
  @Output() updateLoggedSession = new EventEmitter<any>();
  @ViewChild('sessionModal') sessionModal: ElementRef;
  @Input() session: any;
  @Input() request: any;
  @Input() userId: string;
  readonly  ratingScale: number = 5;
  sessionForm: FormGroup;
  timeSlots: string[] = [];
  hoursInSessionTimeDifference: number;
  minutesInSessionTimeDifference: number;
  defaultStartTime: string;
  defaultEndTime: string;
  sessionId: number;

  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private alertService: AlertService) {}

  ngOnInit() {
    this.getTimeSlots();
    this.defaultStartTime = this.request.pairing.start_time;
    this.defaultEndTime = this.request.pairing.end_time;

    this.sessionForm = this.formBuilder.group({
      comment: '',
      startTime: [this.defaultStartTime, [Validators.required]],
      endTime: [this.defaultEndTime, [Validators.required]],
      availability: '',
      reliability: '',
      knowledge: '',
      teaching: '',
      usefulness: '',
    });
  }

  @HostListener('click') onClick() {
    if (!this.sessionModal.nativeElement.contains(event.target)) {
      this.closeSessionModal();
    }
  }

  /**
   * Calculates difference in the time session starts and ends
   *
   * @param startTime - value of the startTime select kbox
   * @param endTime - value of the endTime select box
   *
   * @return {void}
   */
  calculateSessionTimeDifference(startTime, endTime) {
    startTime = startTime ? startTime : this.defaultStartTime;
    endTime = endTime ? endTime : this.defaultEndTime;
    const formattedStartTime = moment(startTime, 'HH:mm');
    const formattedEndTime = moment(endTime, 'HH:mm');

    const timeDifference = moment(formattedEndTime.diff(formattedStartTime))
      .subtract(1, 'hours')
      .format('HH:mm')
      .split(':')
      .map(Number);

    this.hoursInSessionTimeDifference = timeDifference[0];
    this.minutesInSessionTimeDifference = timeDifference[1];
  }

  /**
   * Checks to see if the session id exists for a Mentorship request if not it creates a new
   * session and logs the session. otherwise the session will be updated.
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
    if (this.sessionForm.value.startTime === this.sessionForm.value.endTime) {
      return this.alertService.showMessage('The session start and end times can\'t be the same');
    }

    let ratingValues: Rating = null;
    if (this.sessionForm.value.availability || this.sessionForm.value.reliability ||
      this.sessionForm.value.knowledge || this.sessionForm.value.teaching ||
      this.sessionForm.value.usefulness) {
      ratingValues = {
        availability: this.sessionForm.value.availability,
        reliability: this.sessionForm.value.reliability,
        knowledge: this.sessionForm.value.knowledge,
        teaching: this.sessionForm.value.teaching,
        usefulness: this.sessionForm.value.usefulness,
      };
    }
    const sessionPayload: Session = {
      date: Date.parse(this.session.date) / 1000,
      start_time: this.sessionForm.value.startTime,
      end_time: this.sessionForm.value.endTime,
      comment: this.sessionForm.value.comment,
      rating_scale: this.ratingScale,
      rating_values: ratingValues,
    };
    this.sessionId = this.sessionId === undefined ? this.session.id : this.sessionId,
    this.sessionService.logSession(sessionPayload, this.request.id, this.sessionId)
      .toPromise()
      .then((response) => {
        if (this.userId === this.request.mentor_id) {
          this.alertService.showMessage(`Your session has been logged
            successfully but your rating is not recorded. Only a Mentee can rate for now.`);
        }
        this.updateSession();
        this.closeSessionModal();
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
   * Triggers event that updates a session that was just logged in the array of sessions
   *
   * @return {void}
   */
  updateSession() {
    this.updateLoggedSession.emit(this.session);
  }
}
