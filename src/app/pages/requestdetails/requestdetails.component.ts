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
import { SessionDetails } from '../../interfaces/session.interface';
import { EditDialogComponent } from '../editrequest/edit-request.component';
import { NotificationService } from '../../services/notifications.service';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-requestdetails',
  templateUrl: './requestdetails.component.html',
  styleUrls: ['./requestdetails.component.scss'],
})
export class RequestdetailsComponent implements OnInit {
  details: any;
  requestId: number;
  interestedMentors: Array<Object>;
  msg: string;
  currentMentorButton: string = '';
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

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MdDialog,
    private snackbar: MdSnackBar,
    private auth: AuthService,
    private sessionService: SessionService,
    private notificationService: NotificationService,
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
  }

  ngOnInit() {
    this.userId = this.auth.userInfo.id;
    this.requestId = this.route.snapshot.params['id'];

    /**
     * Gets the request details and thereafter gets the details of the mentee
     */
    this.requestService.getRequestDetails(this.requestId)
      .toPromise()
      .then(res => this.fetchRequestDetails(res))
      .then(() => {
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
      });
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
   * opens dialog modal and triggers selectMentor()
   *
   * @param {Object} mentorDetail - mentor detail object
   * @return {Null}
   */
  openModal(mentorDetail: Object) {
    const dialogRef = this.dialog.open(DialogModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.selectMentor(result, mentorDetail);
    });
  }

  /**
   * matches a mentor to a mentee via request service
   *
   * @param {Event} status
   * @param {Object} mentorDetail
   * @return {Null}
   */
  selectMentor(status: boolean, mentorDetail: any): void {
    if (!status) return;
    const currentDate = Math.ceil(Date.now() / 1000);
    this.loading.selectMentor = true;
    this.currentMentorButton = mentorDetail.name;
    const requestUpdate = {
      mentor_id: mentorDetail.id,
      mentee_name: this.auth.userInfo.name,
      match_date: currentDate
    };

    this.requestService.matchMenteeRequest(this.requestId, requestUpdate)
      .toPromise()
      .then((res) => {
        delete this.loading.selectMentor;
        this.matchedMentor = mentorDetail;
        this.msg = `Thank you. You have been matched with ${mentorDetail['name']}!`;
        this.snackBarOpen(true, this.msg)
          .afterDismissed()
          .subscribe(() => {
            this.router.navigate(['/dashboard'], { queryParams: { refresh: 'dashboard'}});
          });
      })
      .catch((error) => {
        delete this.loading.selectMentor;
        this.msg = 'Failed to Match Request! Try again.';
        this.snackBarOpen(false, this.msg);
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
          .subscribe(() => this.hasAlreadyIndicatedInterest = true);
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
      peer: 'mentor' || 'mentee',
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
            return session.date = (new Date(session.date)).toDateString();
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
    const updatePayload = {
      user_id: this.userId,
    };

    return this.sessionService
      .approveSession(event.sessionId, updatePayload)
      .toPromise()
      .then((res) => {
        const session = this.sessions.find(eachSession => eachSession.id === res.id);
        session.mentee_log_at = res.mentee_log_at;
        this.getSessions(this.details.id, this.include.join(','));
        this.snackBarOpen(true, 'Session successfully updated!');
      })
      .catch(error => this.snackBarOpen(false, 'Unable to update session. Please try again!'));
  }
}
