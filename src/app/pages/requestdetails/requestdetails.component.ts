import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { MdSnackBar, MdSnackBarConfig} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RequestService } from './../../services/request.service';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';
import { CancelRequestDialogComponent } from '../cancelrequest/cancelrequest.component';
import { DialogModalComponent } from '../../components/dialog-modal/dialog-modal.component';
import { LogSessionDialogComponent } from '../../components/sessions/dialog/log-session-dialog.component';
import { SessionDetails } from '../../interfaces/session.interface';
import { EditDialogComponent } from '../editrequest/edit-request.component';
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
  snackBarConfig: any;
  loading: boolean;
  menteeDetails: {};
  actionButtons: Array<Object>;
  currentMentorButton: string = '';
  matchedMentor: {};
  userId: string;
  updater: string;
  sessions: any[];
  include: string[];
  sessionDetails: SessionDetails;

  constructor(
    private requestsService: RequestService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MdDialog,
    private snackbar: MdSnackBar,
    private auth: AuthService,
    private sessionService: SessionService
  ) {
    this.requestId = +this.route.snapshot.params['id'];
    this.details = {};
    this.menteeDetails = null;
    this.interestedMentors = [];
    this.msg = '';
    this.snackBarConfig = { duration: 3000 };
    this.loading = false;
    this.actionButtons = [
      {
        name: 'Edit',
        class: 'md-btn-andela-pink',
      },
      {
        name: 'Cancel Request',
        class: '',
      }
    ];
    this.matchedMentor = {};
    this.userId = '';
    this.updater = 'mentee';
    this.sessions = [];
    this.include = ['totalSessions', 'totalSessionsLogged', 'totalSessionsPending', 'totalSessionsUnlogged'];
    this.sessionDetails = {
      totalSessions: 0,
      totalSessionsLogged: 0,
      totalSessionsPending: 0,
      totalSessionsUnlogged: 0
    };
  }

  ngOnInit() {
    this.userId = this.auth.userInfo.id;
    /**
     * Gets the request details and thereafter gets the details of the mentee
     */
    this.requestsService.getRequestDetails(this.requestId)
      .toPromise()
      .then((res) => {
        this.details = res.data;
        this.details.days = res.data.pairing.days;

        // check if a mentor has been matched already
        if (this.details.mentor_id) {
          this.getMentorInfo(this.details.mentor_id.split(), true);
        } else {
          this.getMentorInfo(res.data.interested, false);
        }

        return this.details;
      })
      .then(() => {
        this.userService.getUserInfo(this.details.mentee_id)
          .toPromise()
          .then((userDetails) => {
            this.menteeDetails = userDetails;
            return this.menteeDetails;
          });
      })
      .then(() => this.getSessions(this.details.id, this.include.join(',')));
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
          }
        );
    });
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
    this.loading = true;
    this.currentMentorButton = mentorDetail.name;
    const requestUpdate = {
      mentor_id: mentorDetail.id,
      mentee_name: this.auth.userInfo.name,
      match_date: currentDate
    };

    this.requestsService.matchMenteeRequest(this.requestId, requestUpdate)
      .toPromise()
      .then((res) => {
        this.loading = false;
        this.matchedMentor = mentorDetail;
        this.msg = `Thank you. You have been matched with ${mentorDetail['name']}!`;
        this.snackBarOpen(true, this.msg)
          .afterDismissed()
          .subscribe(() => {
            this.router.navigate(['/dashboard'], { queryParams: { refresh: 'dashboard'}});
          });
      })
      .catch((error) => {
        this.msg = 'Failed to Match Request! Try again.';
        this.snackBarOpen(false, this.msg);
      });
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
        this.requestsService.cancelRequest(this.requestId)
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
  callButtonAction(buttonName: string): void {
    switch (buttonName.toLowerCase()) {
      case 'cancel request': return this.cancelRequest();
      case 'edit': return this.editRequest();
      default: return;
    }
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
      peer: 'mentor',
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
  getSessions(requestId: number, include: string) {
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
      user_Id: this.userId
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
