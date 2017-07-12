import { Component, Optional, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MdSnackBar, MD_DIALOG_DATA} from '@angular/material';

import { SessionService } from '../../../../services/session.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-rate-session',
  templateUrl: 'rate-session-dialog.component.html',
  styleUrls: ['rate-session-dialog.component.scss'],
})
export class RateSessionDialogComponent {
  loading: boolean;
  mentorDetails: any;
  scale: number = 5;
  ratedMetric: any = {
    session_id: this.session.id,
    scale: this.scale,
    ratings: {},
  };
  ratingMetrics: any[] = [{
    id: 'Availability',
    desc: `Assessing a mentor’s ability to provide assistance to a mentee when it’s needed and
    is flexible to accommodate changes within a mentee's schedule.`,
  },
  {
    id: 'Reliability',
    desc: `Assessing a mentor’s ability to be on-time for scheduled sessions and
           commitment to the agreed meeting times with their mentees.`,
  },
  {
    id: 'Knowledge',
    desc: `Assessing a mentor’s knowledge and/or expertise regarding their identified skill sets.`,
  },
  {
    id: 'Teaching',
    desc: `Assessing mentors on their ability to pass across knowledge in a way that allows
           the mentee to learn the material`,
  },
  {
    id: 'Usefulness',
    desc: `Assessing mentors on their ability to provide assistance and/or guidance regarding
          issues or problems that mentees share with them`,
  }];

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    public dialogRef: MdDialogRef<any>,
    private snackBar: MdSnackBar,
    @Optional() @Inject(MD_DIALOG_DATA) public session: any,
  ) {
    this.loading = false;
  }

  /**
   * Rates a session based on the given metrics
   *
   * @param {Object} submittedMetric - submitted form object
   */
  rateSession(submittedMetric) {
    this.loading = true;
    this.sessionService.rateSession(submittedMetric)
    .toPromise()
    .then(
      (value) => {
        this.snackBarOpen(true, value);
        this.loading = false;
      },
    )
    .catch(
        (error) => {
          this.snackBarOpen(false, error);
          this.loading = false;
        },
      )
  }

  /**
   * Validates the ratedMetric object
   * 
   * @return {Boolean} 
   */
  validateRatedMetric() {
    return !(Object.keys(this.ratedMetric.ratings).length === this.scale);
  }

  /**
   * Sets the values for each metric in the form group
   *
   * @param {Object} clickObj - holds the metric and their corresponding values
   */
  ratingStarClick(clickObj: any): void {
      this.ratedMetric.ratings[clickObj.id.toLowerCase()] = clickObj.rating;
  }

  /**
   * A snackbar to show result of the rating action
   *
   * @param {Boolean} status - indicates if the request was successful or not
   */
  private snackBarOpen(status, value) {
    const config = { duration: 3000 };

    if (!status) {
      return this.snackBar
        .open(value.message, 'close', config);
    }

    this.snackBar
      .open(value.message, 'close', config)
      .afterDismissed()
      .toPromise().then(() => {
        this.dialogRef.close(true);
      });
  }
}
