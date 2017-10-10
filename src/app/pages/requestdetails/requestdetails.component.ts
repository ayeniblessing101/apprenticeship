import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RequestService } from './../../services/request.service';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';
import { CancelRequestDialogComponent } from '../cancelrequest/cancelrequest.component';
import { DialogModalComponent } from '../../components/dialog-modal/dialog-modal.component';
import { LogSessionDialogComponent } from '../../components/sessions/dialog/log-session-dialog.component';
import { MentorProfileModalComponent } from './mentor-profile-modal/mentor-profile-modal.component';
import { SessionDetails } from '../../interfaces/session.interface';
import { EditDialogComponent } from '../editrequest/edit-request.component';
import { NotificationService } from '../../services/notifications.service';
import { SegmentService } from '../../services/segment.service';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-requestdetails',
  templateUrl: './requestdetails.component.html',
  styleUrls: ['./requestdetails.component.scss'],
})
export class RequestdetailsComponent implements OnInit {
  static readonly matchedStatusId = 2;
  details: any;
  requestId: number;
  interestedMentors: Array<Object>;
  msg: string;
  matchedMentor: {};
  sessions: any[];
  sessionDetails: SessionDetails;
  actionButtons: any[];
  menteeDetails: any;
  mentorDetails: any;
  snackBarConfig: any;
  snackBarMsg: string;
  hasAlreadyIndicatedInterest: Boolean = false;
  loading: any;
  userId: string;
  updater: string;
  include: string[];
  canViewInterested: boolean;
  isMentorshipEnding: boolean;
  mentorshipEndDate: Date;
  isExtensionPending: boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MdDialog,
    private snackbar: MdSnackBar,
    private auth: AuthService,
    private sessionService: SessionService,
    private notificationService: NotificationService,
    private segmentService: SegmentService,
    private requestService: RequestService,
  ) {
    this.requestId = +this.route.snapshot.params['id'];
    this.details = {};
    this.menteeDetails = {};
    this.mentorDetails = {};
    this.interestedMentors = [];
    this.msg = '';
    this.snackBarConfig = { duration: 3000 };
    this.snackBarMsg = '';
    this.loading = {};
    this.sessions = [];
    this.actionButtons = [
      {
        id: 'edit',
        name: 'Edit',
        class: 'md-btn-andela-pink',
      },
      {
        id: 'cancel',
        name: 'Cancel Request',
        class: '',
      },
      {
        id: 'interested',
        name: 'I\'m interested',
        class: 'md-btn-andela-pink',
      },
    ];
    this.matchedMentor = {};
    this.userId = '';
    this.updater = '';
    this.sessions = [];
    this.include = ['totalSessions', 'totalSessionsLogged', 'totalSessionsPending', 'totalSessionsUnlogged'];
    this.sessionDetails = {
      totalSessions: 0,
      totalSessionsLogged: 0,
      totalSessionsPending: 0,
      totalSessionsUnlogged: 0,
    };
    this.isMentorshipEnding = false;
    this.isExtensionPending = false;
  }

  ngOnInit() {
    this.userId = this.auth.userInfo.id;
    this.requestId = this.route.snapshot.params['id'];
    this.getReferralData();

    /**
     * Gets the request details and thereafter gets the details of the mentee
     */
    this.requestService.getRequestDetails(this.requestId)
      .toPromise()
      .then(res => this.fetchRequestDetails(res))
      .then(() => {
        this.segmentService.track('VIEW REQUEST CLICK', {
            requestTitle: this.details.title,
            requiredSkills: this.details.request_skills
          });
        this.getUserInfo(this.details.mentee_id, 'mentee');
        this.getMentorInfo(this.details.interested, false);
        this.canViewInterested = (this.details.status === 'open' && this.details.interested.length &&
                                  this.details.mentee_id === this.userId) ||
                                 (this.details.interested.length &&
                                  this.auth.userInfo.roles.LENKEN_ADMIN);

        if (this.details.mentor_id) {
          this.getUserInfo(this.details.mentor_id, 'mentor');
        }

        if (this.details.mentee_id === this.userId) {
          this.updater = 'mentee';
        } else {
          this.updater = 'mentor';
        }

        this.getSessions(this.details.id, this.include.join(','))
      })
      .then(() => this.isMentorshipPeriodEnding())
      .then(() => this.isExtensionRequestPending());
  }

  /**
   * Check parameter added to referral link
   * Redirect after tracking to prevent tracking after reload
   */
  getReferralData() {
    if (window.location.href.split("referrer=")[1] == "email") {
      this.segmentService.track("MATCHING SKILLS REFERRAL", {
        "Link name": window.location.href.split("referrer=")[1]
      });
    }
    if (window.location.href.split("referrer=")[1] == "slack") {
      this.segmentService.track("MATCHING SKILLS REFERRAL", {
        "Link name": window.location.href.split("referrer=")[1]
      });
    }
  }

  /**
   * fetches user details
   *
   * @param {Any} interested - list of interested mentor ids
   * @return {Null}
   */
  getMentorInfo (interested: Array<any>, isMatched: boolean) {
    if (!interested) return;

    interested.map((mentorId) => {
      this.userService.getUserInfo(mentorId)
        .subscribe((mentorDetails) => {
          if (isMatched) {
            this.matchedMentor = mentorDetails;
          } else {
            this.interestedMentors.push(mentorDetails);
          }
        },
          (error) => {
            this.msg = 'Unable to get mentor details';
            this.snackBarOpen(false, this.msg);
          },
        );
    });
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
   * Opens mentor profile modal
   *
   * @param {Object} mentor - object containing mentor details
   *
   * @return {Null}
   */
  openMentorProfile(mentor: any): void {
    this.dialog.open(MentorProfileModalComponent, {
      data: {
        mentorDetails: mentor,
        requestDetails: this.details,
      }
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
   * opens snackbar
   *
   * @param {Boolean} status
   * @return {Null}
   */
  private snackBarOpen(status: boolean, message: string): any {
    if (!status) {
      return this.snackbar
        .open(message, 'close', this.snackBarConfig);
    }

    return this.snackbar
      .open(message, 'close', this.snackBarConfig)
  }

  /**
   * returns a css class for chips based on request status
   *
   * @param {String} status - request status
   * @return {String} statusClass - css class
   */
  getStatusClass(status?: string): string {
    if (status) {
      let statusClass = '';

      switch (status) {
        case 'open': statusClass = 'rounded-chip-open'; break;
        case 'matched': statusClass = 'rounded-chip-matched'; break;
        case 'closed': statusClass = 'rounded-chip-closed'; break;
        default: statusClass = 'rounded-chip-cancelled';
      }

      return statusClass;
    }
  }

  /**
   * cancels a pending request
   *
   * @return {Null}
   */
  cancelRequest(): void {
    const dialogRef = this.dialog.open(CancelRequestDialogComponent);
    dialogRef.afterClosed().toPromise().then((result) => {
      if (result) {
        this.requestService.cancelRequest(this.requestId)
          .toPromise().then(() => {
            let snackbarConfig = new MdSnackBarConfig();
            snackbarConfig.duration = 2000;

            this.snackbar.open('Request cancelled', 'close', snackbarConfig)
            .afterDismissed()
            .toPromise()
            .then(()=> {
              this.router.navigate(['/mentee']);
            });
          });
      }
    });
  }

  /**
   * opens edit dialog modal
   *
   * @return {Null}
   */
  editRequest(): void {
    this.dialog.open(EditDialogComponent, {
      data: {
        id: this.requestId,
        details: this.details
      }
    });
  }

  /**
   * calls a button action
   *
   * @param {String} buttonName
   * @return {Function}
   */
  callButtonAction(buttonId: string): any {
    switch (buttonId.toLowerCase()) {
      case 'cancel': return this.cancelRequest();
      case 'edit': return this.editRequest();
      case 'interested': return this.indicateInterest(this.details);
      default: return;
    }
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
    this.loading.interested = true;
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
        delete this.loading.interested
        this.snackBarMsg = 'You have indicated interest in this mentorship request!';
        this.snackBarOpen(true, this.snackBarMsg)
          .afterDismissed()
          .toPromise()
          .then(() => {
            this.hasAlreadyIndicatedInterest = true
          })
      })
      .catch((error) => {
        delete this.loading.interested
        this.snackBarMsg = 'Something went wrong! please try again.';
        this.snackBarOpen(false, this.snackBarMsg);
      });
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
      peer: this.details.mentor_id === this.userId ? 'mentee' : 'mentor',
    };
    this.loading.sessionLoading = true;

    const dialogRef = this.dialog.open(LogSessionDialogComponent, config);
    dialogRef.afterClosed()
      .subscribe((res) => {
        delete this.loading.sessionLoading;
        if (typeof res === 'undefined') return 0;

        if (res.status) {
          this.snackBarOpen(false, res.message);
        } else if (!res.status) {
          res.date = new Date(res.date);
          this.sessions.push(res);
          this.sessions.map((session) => {
            if (session.id === res.id) {
              if (this.userId === this.details.mentor_id) {
                session.mentee_approved = null;
              } else {
                session.mentor_approved = null;
              }
              return session;
            }
          });
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
  getSessions(requestId: number, include: string) {
    this.loading.sessionLoading = true;
    return this.sessionService.getSessions(requestId, include)
      .subscribe(
        (res) => {
          delete this.loading.sessionLoading;
          this.sessions = res.sessions.map((session) => {
            return session.date;
          });
          this.sessions = res.sessions.reverse();
          this.sessionDetails = {
            totalSessions: res.totalSessions,
            totalSessionsLogged: res.totalSessionsLogged,
            totalSessionsPending: res.totalSessionsPending,
            totalSessionsUnlogged: res.totalSessionsUnlogged,
          }
        },
        (error) => {
          delete this.loading.sessionLoading;
          this.snackBarOpen(false, 'Unable to retrieve saved sessions');
        });
  }

  /**
   * approves a pending session
   *
   * @param {Event} event - event object
   */
  approveSession(event) {
    this.segmentService.track('APPROVE SESSION', {
        approvedBy: this.userId === this.details.mentor_id ? 'mentor' : 'mentee'
      });

    return this.sessionService
      .approveSession(event.sessionId, {user_id: this.userId})
      .toPromise()
      .then((res) => {
        this.sessions.map((session) => {
          if (session.id === res.id) {
            if (this.userId === this.details.mentor_id) {
              session.mentor_approved = true;
            } else {
              session.mentee_approved = true;
            }
            return session;
          }
        });
        this.snackBarOpen(true, 'Session successfully updated!');
      })
      .catch(error => this.snackBarOpen(false, 'Unable to update session. Please try again!'));
  }

  /**
   * Rejects a pending session
   *
   * @param {Event} event - event object
   *
   * @return {void}
   */
  rejectSession(event) {
    this.segmentService.track('REJECT SESSION', {
      rejectedBy: this.userId === this.details.mentor_id ? 'mentor' : 'mentee'
    });

    return this.sessionService
      .rejectSession(event.sessionId, {user_id: this.userId})
      .toPromise()
      .then((res) => {
        this.sessions.map((session) => {
        if (session.id === res.id) {
          if (this.userId === this.details.mentor_id) {
            session.mentor_approved = false;
          } else {
            session.mentee_approved = false;
          }
          return session;
        }
      });
    })
    .catch(error => this.snackBarOpen(false, error));
  }

  /**
   * Set isMentorshipEnding flag to true if the mentorship period
   * is about to end in the next two weeks
   */
  isMentorshipPeriodEnding() {
    if (this.details.status_id === RequestdetailsComponent.matchedStatusId) {
      const duration = this.details.duration * 30;
      const matchDate = new Date(this.details.match_date.split(' ')[0]);
      const currentDate = new Date();
      const oneDay = 1000 * 60 * 60 * 24;
      const difference
        = Math.ceil(
        (currentDate.getTime() - matchDate.getTime()) / oneDay
      );
      this.mentorshipEndDate = new Date(duration * oneDay + matchDate.getTime());
      this.isMentorshipEnding = (this.mentorshipEndDate > currentDate
        && typeof this.details.extension === 'undefined'
        && (duration - difference) < 15);
    }
  }

  /**
   * Set isExtensionPending flag to true if there is a pending extension request
   */
  isExtensionRequestPending() {
    this.isExtensionPending
      = (this.details.status_id === RequestdetailsComponent.matchedStatusId
      && this.mentorshipEndDate > new Date()
      && typeof this.details.extension !== 'undefined'
      && this.details.extension.approved === null);
  }

  /**
   * Send request to create mentorship period
   * extension request
   */
  requestExtension() {
    this.requestService.requestExtension(this.details.id)
      .toPromise()
      .then((response) => {
        this.isExtensionPending = true;
        const successMessage = response.message;
        this.snackbar.open(
          successMessage,
          'Close', {
            duration: 4000,
          });
      })
      .catch((error) => {
        this.snackbar.open(
          'An error occurred, try again',
          'Close', {
            duration: 4000,
          });
      });
  }

  /**
   * Approve mentorship extension request
   */
  approveExtension() {
    this.requestService
      .approveExtensionRequest(this.requestId).toPromise()
      .then((response) => {
        this.isExtensionPending = false;
        const successMessage = response.message;
        this.snackbar.open(
          successMessage,
          'Close', {
            duration: 4000,
          });
      })
      .catch((error) => {
        this.snackbar.open(
          'An error occurred, try again',
          'Close', {
            duration: 4000,
          });
      });
  }

  /**
   * Reject mentorship extension request
   */
  rejectExtension() {
    this.requestService
      .rejectExtensionRequest(this.requestId).toPromise()
      .then((response) => {
        this.isExtensionPending = false;
        const successMessage = response.message;
        this.snackbar.open(
          successMessage,
          'Close', {
            duration: 4000,
          });
      })
      .catch((error) => {
        this.snackbar.open(
          'An error occurred, try again',
          'Close', {
            duration: 4000,
          });
      });
  }
}
