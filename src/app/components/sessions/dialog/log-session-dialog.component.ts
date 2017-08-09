import {Component, Inject, OnInit} from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../../../services/session.service';
import { DateValidator } from './date.validator'
import * as moment from 'moment';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-log-session-modal',
  templateUrl: './log-session-dialog.component.html',
  styleUrls: ['./log-session-dialog.component.scss']
})
export class LogSessionDialogComponent implements OnInit {
  title: string;
  info: string;
  userId: string;
  logSessionForm: FormGroup;
  loading: boolean;
  peer: string;
  details: any;

  constructor(
    public dialogRef: MdDialogRef<LogSessionDialogComponent>,
    private formBuilder: FormBuilder,
    private dateValidator: DateValidator,
    private sessionService: SessionService,
    @Inject(MD_DIALOG_DATA) private data: any
  ) {
    this.peer = this.data.peer;
    this.title = 'LOG SESSION';
    this.info = `You are about to log a mentorship session. This process will be completed when your ${this.peer} approves`;
    this.userId = this.data.userId;
    this.loading = false;
    this.details = this.data.requestDetails;
  }

  ngOnInit() {
    this.createForm();
    this.getMostRecentDate();
  }

  /**
   * creates a form instance for logging session
   *
   * @return {Null}
   */
  createForm(): void {
    this.logSessionForm = this.formBuilder.group({
      date: ['', [Validators.required, this.dateValidator.rangeValidator]],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
    this.logSessionForm.controls['startTime'].setValue(this.details.pairing.start_time);
    this.logSessionForm.controls['endTime'].setValue(this.details.pairing.end_time);
  }

  /**
   * calls the session service to log a session
   *
   * @return {Null}
   */
  logSession(): void {
    const sessionPayload = {
      date: Date.parse(this.logSessionForm.value.date) / 1000,
      start_time: this.logSessionForm.value.startTime,
      end_time: this.logSessionForm.value.endTime,
      request_id: this.details.id,
      user_id: this.userId
    };

    this.loading = true;

    this.sessionService.logSession(sessionPayload)
      .toPromise()
      .then((response) => {
        this.loading = false;
        this.dialogRef.close(response);
      })
      .catch(error => this.dialogRef.close(false));
  }

  /**
   * gets the most recent date to be logged
   *
   * @return {Date} Date object
   */
  getMostRecentDate() {
    const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const pairingDays = this.details.pairing.days;
    const today = moment().format('LLLL');
    const lastPairingDay = pairingDays[pairingDays.length - 1];

    // get the diff between the current day and the last pairing day of the week
    const diff = parseInt(moment().format('e'), 10) - weekdays.indexOf(lastPairingDay);

    // if today > dateToLog return dateToLog, else return today
    return diff < 1 ? today: moment().subtract(diff, 'day').format('LLLL');
  }
}
