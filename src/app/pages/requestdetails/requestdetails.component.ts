import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RequestService } from './../../services/request.service';
import { UserDetailService } from '../../services/user-detail.service';
import { Observable } from 'rxjs/Rx';
import { CancelRequestDialogComponent } from '../cancelrequest/cancelrequest.component';
import { DialogModalComponent } from '../../components/dialog-modal/dialog-modal.component';
import { Details } from '../../interfaces/details.interface';
import { Skill } from '../../interfaces/skill.interface';
import { EditDialogComponent } from '../editrequest/edit-request.component';
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

  constructor(
    private requestsService: RequestService,
    private userDetailService: UserDetailService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MdDialog,
    private snackbar: MdSnackBar,
    private auth: AuthService
  ) {
    this.requestId = +this.route.snapshot.params['id'];
    this.details = {};
    this.interestedMentors = [];
    this.msg = '';
    this.snackBarConfig = { duration: 3000 };
    this.loading = false;
    this.menteeDetails = this.auth.userInfo;
    this.actionButtons = [
      {
        name: 'Cancel',
        class: '',
      },
      {
        name: 'Edit',
        class: 'md-btn-andela-pink',
      }
    ];
  }

  ngOnInit() {
    this.requestsService
      .getRequestDetails(this.requestId)
      .toPromise()
      .then((res) => {
        this.details = res.data;
        this.details['days'] = res.data['pairing'].days;
        this.getMentorDetails(res.data.interested)
      });
  }

  /**
   * fetches user details
   * 
   * @param {Array} interested - list of interested mentor ids
   * @return {Null}
   */
  getMentorDetails (interested: Array<string>) {
    if (!interested) return;

    interested.map((mentorId) => {
      this.userDetailService.getUserDetails(mentorId)
        .subscribe(
          mentorDetails => this.interestedMentors.push(mentorDetails),
          error => {
            this.msg = 'Unable to get mentor details';
            this.snackBarOpen(false, this.msg);
          }
        );
    })
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
  selectMentor(status: boolean, mentorDetail: Object) {
    if (!status) return;
    const currentDate = Math.ceil(Date.now() / 1000);
    this.loading = true;
    this.currentMentorButton = mentorDetail['name'];
    console.log(mentorDetail['name']);
    const requestUpdate = {
      mentor_id: mentorDetail['id'],
      mentee_name: this.auth.userInfo.name,
      match_date: currentDate
    };

    this.requestsService.matchMenteeRequest(this.requestId, requestUpdate)
      .toPromise()
      .then(res => {
        this.loading = false;
        this.msg = `Thank you. You have been matched with ${mentorDetail['name']}!`;
        this.snackBarOpen(true, this.msg);
      })
      .catch(error => {
        this.msg = 'Failed to Match Request! Try again.';
        this.snackBarOpen(false, this.msg);
      });
  }

  /**
   * triggers snackbar
   * 
   * @param {Boolean} status
   * @return {Null}
   */
  private snackBarOpen(status: boolean, message: string) {
    if (!status) {
      return this.snackbar
        .open(message, 'close', this.snackBarConfig);
    }

    this.snackbar
      .open(message, 'close', this.snackBarConfig)
      .afterDismissed()
      .subscribe(() => {
        this.router.navigate(['/dashboard'], { queryParams: { refresh: 'dashboard'}});
      });
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
  cancelRequest() {
    const dialogRef = this.dialog.open(CancelRequestDialogComponent);
    dialogRef.afterClosed().subscribe((result => {
      if (result) {
        this.requestsService.updateRequestStatus(this.requestId, { status: 3 });
      }
    }));
  }

  /**
   * opens edit dialog modal
   *
   * @return {Null}
   */
  editRequest() {
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
  callButtonAction(buttonName: string) {
    switch (buttonName.toLowerCase()) {
      case 'cancel': return this.cancelRequest();
      case 'edit': return this.editRequest();
      default: return;
    }
  }
}
