import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { NotificationService } from '../../services/notifications.service';
import { SkillService } from './../../services/skill.service';
import { RequestService } from './../../services/request.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-mentor-request-detail',
  templateUrl: './mentor-request-detail.component.html',
  styleUrls: ['./mentor-request-detail.component.scss']
})
export class MentorRequestDetailComponent implements OnInit {
  private requestId: number;
  details: {};
  actionButtons: Array<Object>;
  menteeDetails: {};
  snackBarConfig: any;
  snackBarMsg: string;
  hasAlreadyIndicatedInterest: Boolean = false;
  loading: Boolean = false;

  constructor(
    private requestsService: RequestService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private snackbar: MdSnackBar,
  ) {
    this.snackBarConfig = { duration: 3000 };
    this.snackBarMsg = '';
    this.details = {};
    this.actionButtons = [
      {
        id: 'appMentorshipInterestButton',
        name: 'I\'m interested',
        class: 'md-btn-andela-pink',
      }
    ];
    this.menteeDetails = this.auth.userInfo;
  }

  ngOnInit() {
    this.requestId = this.route.snapshot.params['id'];
    this.requestsService.getRequestDetails(this.requestId)
      .toPromise()
      .then((res) => {
        res.data.interested = res.data.interested ? res.data.interested : [];
        this.details = res.data;
        this.hasAlreadyIndicatedInterest = res
          .data.interested.includes(this.auth.userInfo.id);
        this.details['days'] = res.data['pairing'].days;
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
  indicateInterest(details) {
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
        this.snackBarMsg = 'You have indicated interest in this mentorship request!';
        this.snackBarOpen(true, this.snackBarMsg);
      })
      .catch(error => {
        this.snackBarMsg = 'Something went wrong! please try again.';
        this.snackBarOpen(false, this.snackBarMsg);
      });
  }

  private snackBarOpen(status: Boolean, message: string) {
    if (!status) {
      return this.snackbar
        .open(message, 'close', this.snackBarConfig);
    }

    this.snackbar
      .open(message, 'close', this.snackBarConfig)
      .afterDismissed()
      .subscribe(() => this.hasAlreadyIndicatedInterest = true);
  }
}
