import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { NotificationService } from '../../services/notifications.service';
import { SkillService } from './../../services/skill.service';
import { RequestService } from './../../services/request.service';
import { Details } from '../../interfaces/details.interface';
import { Pairing } from '../../interfaces/pairing.interface';
import { Skill } from '../../interfaces/skill.interface';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-mentor-request-detail',
  templateUrl: './mentor-request-detail.component.html',
  styleUrls: ['./mentor-request-detail.component.scss']
})
export class MentorRequestDetailComponent implements OnInit {
  skills: Array<Skill>;
  details: Details;
  pairing: Pairing;
  days: any = [];
  snackBarConfig: any;
  hasAlreadyIndicatedInterest: Boolean = false;
  loading: Boolean = false;
  private requestId: number;

  constructor(
    private requestsService: RequestService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private snackbar: MdSnackBar,
  ) {
    this.snackBarConfig = { duration: 3000};
  }

  ngOnInit() {
    this.requestId = this.route.snapshot.params['id'];
    this.requestsService.getRequestDetails(this.requestId)
      .toPromise()
      .then((res) => {
        res.data.interested = res.data.interested ? res.data.interested : [];
        this.details = res.data;
        this.pairing = res.data.pairing;
        this.days = this.pairing['days'];
        this.hasAlreadyIndicatedInterest = res
          .data.interested.includes(this.auth.userInfo.id);
      });
  }

  /**
   * Indicate interest method updates the current mentorship request data
   * and adds a new user id to the interest field array.
   *
   * @param {Object} details the request details
   *
   * @return {Object} the response of the api call
   */
  private indicateInterest(details) {
    this.loading = true;
    const mentorId = this.auth.userInfo.id;
    const menteeId = details.mentee_id;
    const mentorName = this.auth.userInfo.name;
    const requestId = details.id;

    return this.requestsService
      .updateMentorRequestInterested(requestId, { interested: [mentorId] })
      .toPromise()
      .then(() => this.notificationService.sendMessage([menteeId], {
        type: '',
        message: {
          title: `${mentorName} has indicated interest in being your mentor`,
          content: 'I would like to mentor you.'
        },
        sender: `${mentorName}`,
        timestamp: Date.now(),
        messageUrl: `${environment.lenkenBaseUrl}/requests/${requestId}`
      }))
      .then(() => {
        this.loading = false;
        this.snackBarOpen(true);
      })
      .catch(error => this.snackBarOpen(false, error));
  }

  private snackBarOpen(status: Boolean, message?: string) {
    if (status === false && !message) {
      message = 'Something went wrong! please try again.';
    } else if (status === true && !message) {
      message = 'You have indicated interest in this mentorship request!';
    }
    if (!status) {
      return this.snackbar
        .open(message, 'close', this.snackBarConfig);
    }

    this.snackbar
      .open(message, 'close', this.snackBarConfig)
      .afterDismissed()
      .subscribe(() => {
        this.hasAlreadyIndicatedInterest = true;
      });
  }
}
