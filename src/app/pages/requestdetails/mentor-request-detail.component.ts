import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { MdSnackBar } from '@angular/material';
import { NotificationService } from '../../services/notifications.service';
import { LogSessionDialogComponent } from '../../components/sessions/dialog/log-session-dialog.component';
import { UserService } from '../../services/user.service';
import { RequestService } from './../../services/request.service';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import { SessionDetails } from '../../interfaces/session.interface';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-mentor-request-detail',
  templateUrl: './mentor-request-detail.component.html',
  styleUrls: ['./mentor-request-detail.component.scss'],
})
export class MentorRequestDetailComponent implements OnInit {
  private requestId: number;
  details: any;
  sessions: any[];
  sessionDetails: SessionDetails;
  actionButtons: any[];
  menteeDetails: any;
  mentorDetails: any;
  snackBarConfig: any;
  snackBarMsg: string;
  hasAlreadyIndicatedInterest: Boolean = false;
  loading: Boolean = false;
  userId: string;
  updater: string;
  include: string[];
  // getUserDetails: any;

  constructor(
    private requestService: RequestService,
    private notificationService: NotificationService,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private snackbar: MdSnackBar,
    private dialog: MdDialog,
    private userService: UserService,
  ) {
    this.snackBarConfig = { duration: 3000 };
    this.snackBarMsg = '';
    this.details = {};
    this.sessions = [];
    this.menteeDetails = {};
    this.mentorDetails = {};
    this.actionButtons = [
      {
        id: 'appMentorshipInterestButton',
        name: 'I\'m interested',
        class: 'md-btn-andela-pink',
      },
    ];
    this.userId = '';
    this.updater = 'mentor';
    this.include = ['totalSessions', 'totalSessionsLogged', 'totalSessionsPending', 'totalSessionsUnlogged'];
    this.sessionDetails = {
      totalSessions: 0,
      totalSessionsLogged: 0,
      totalSessionsPending: 0,
      totalSessionsUnlogged: 0
    };
  }

  ngOnInit() {
    /**
     * Gets the request details and thereafter gets the details of the mentee
     */
    this.requestId = this.route.snapshot.params['id'];
    this.userId = this.auth.userInfo.id;

    this.requestService.getRequestDetails(this.requestId)
      .toPromise()
      .then((res) => this.fetchRequestDetails(res))
      .then(() => {
        this.getUserInfo(this.details.mentee_id, 'mentee');

        if (this.details.mentor_id) {
          this.getUserInfo(this.details.mentor_id, 'mentor');
        }

        this.getSessions(this.details.id, this.include.join(','))
      });
  }

  /**
   * fetches the request details returned by the request service
   *
   * @param res
   * @returns {any}
   */
  fetchRequestDetails (res) {
    res.data.interested = res.data.interested ? res.data.interested : [];
    this.details = res.data;
    this.hasAlreadyIndicatedInterest = res.data.interested.includes(this.userId);
    this.details.days = res.data.pairing.days;
    return this.details;
  }

  /**
   * fetches user information
   *
   * @param userId
   * @param userType
   */
  getUserInfo(userId: string, userType: string) {
    this.userService.getUserInfo(userId)
      .toPromise()
      .then((userDetails) => {
        if (userType === 'mentee') {
          this.menteeDetails = userDetails;
        } else {
          this.mentorDetails = userDetails;
        }
      })
      .catch(error => this.snackBarOpen(false, `Unable to get ${userType} details`));
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

    return this.requestService
      .updateMentorRequestInterested(requestId, { interested: [mentorId] })
      .toPromise()
      .then(() => this.notificationService.sendMessage([menteeId], {
        type: '',
        message: {
          title: `${mentorName} has indicated interest in being your mentor`,
          content: 'I would like to mentor you.',
        },
        sender: `${mentorName}`,
        timestamp: Date.now(),
        messageUrl: `${environment.lenkenBaseUrl}/requests/${requestId}`,
      }))
      .then(() => {
        this.loading = false;
        this.snackBarMsg = 'You have indicated interest in this mentorship request!';
        this.snackBarOpen(true, this.snackBarMsg)
          .afterDismissed()
          .subscribe(() => this.hasAlreadyIndicatedInterest = true);
      })
      .catch((error) => {
        this.snackBarMsg = 'Something went wrong! please try again.';
        this.snackBarOpen(false, this.snackBarMsg);
      });
  }

  /**
   * opens snackbar
   *
   * @param {Boolean} - status
   * @param {String} - message
   * @return {any}
   */
  private snackBarOpen(status: Boolean, message: string):any {
    if (!status) {
      return this.snackbar
        .open(message, 'close', this.snackBarConfig);
    }

    return this.snackbar
      .open(message, 'close', this.snackBarConfig);
  }

  /**
   * opens log session dialog
   *
   * @return {Null}
   */
  openLogSessionDialog(): void {
    const config = new MdDialogConfig();
    config.data = {
      requestDetails: this.details,
      userId: this.userId,
      peer: 'mentee'
    };

    const dialogRef = this.dialog.open(LogSessionDialogComponent, config);
    dialogRef.afterClosed()
      .subscribe((res) => {
        if (typeof res === 'undefined') return 0;

        if (res.status) {
          this.snackBarOpen(false, res.message);
        } else if (!res.status) {
          res.date = new Date(res.date);
          this.sessions.push(res);
          this.snackBarOpen(true, 'Session successfully saved');
        } else {
          this.snackBarOpen(false, 'Failed to save session. Please try again!');
        }
      });
  }

  /**
   * retrieves all logged sessions for a request
   *
   * @param {Number} requestId
   * @return {Observable}
   */
  getSessions(requestId: number, include: string){
    return this.sessionService.getSessions(requestId, include)
      .subscribe(
        (res) => {
          this.sessions = res.sessions.map((session) => {
            return session.date = (new Date(session.date)).toDateString();
          });
          this.sessions = res.sessions.reverse();
          this.sessionDetails = {
            totalSessions: res.totalSessions,
            totalSessionsLogged: res.totalSessionsLogged,
            totalSessionsPending: res.totalSessionsPending,
            totalSessionsUnlogged: res.totalSessionsUnlogged
          }
        },
        error => this.snackBarOpen(false, 'Unable to retrieve saved sessions')
      );
  }

  /**
   * approves a pending session
   *
   * @param {Event} event - event object
   */
  approveSession(event) {
    const updatePayload = {
      user_id: this.userId,
    };

    return this.sessionService
      .approveSession(event.sessionId, updatePayload)
      .subscribe(
        (res) => {
          const session = this.sessions.find(session => session.id === res.id);
          session.mentee_log_at = res.mentee_log_at;
          this.getSessions(this.details.id, this.include.join(','));
          this.snackBarOpen(true, 'Session successfully updated!');
        },
        error => this.snackBarOpen(false, 'Unable to update session. Please try again!')
      )
  }
}
