import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SkillService } from './../../services/skill.service';
import { AuthService } from '../../services/auth.service';
import { RequestService } from './../../services/request.service';
import { UserDetailService } from '../../services/user-detail.service';
import { Observable } from 'rxjs/Rx';
import { CancelRequestDialogComponent } from '../cancelrequest/cancelrequest.component';
import { DialogModalComponent } from '../../components/dialog-modal/dialog-modal.component';
import { Details } from '../../interfaces/details.interface';
import { Skill } from '../../interfaces/skill.interface';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-requestdetails',
  templateUrl: './requestdetails.component.html',
  styleUrls: ['./requestdetails.component.scss'],
})
export class RequestdetailsComponent implements OnInit, OnDestroy {
  skills: any;
  details: any;
  days: Array<string>;
  requestId: number;
  interestedMentors: Array<Object>;
  errors: Object;
  mentorMatched: Boolean;
  successMsg: String;
  snackBarConfig: any;
  statuses: Array<Object>;
  msgs: Object;
  loading: boolean;
  skillSubscription: any;
  statusSubscription: any;
  requestDetailsSubscription: any;

  constructor(
    private skillsService: SkillService,
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
    this.days = [];
    this.statuses = []
    this.interestedMentors = [];
    this.errors = {};
    this.mentorMatched = false;
    this.successMsg = '';
    this.snackBarConfig = { duration: 3000 };
    this.loading = false;
  }

  ngOnInit() {
    this.skillSubscription = this.skillsService
      .getSkills()
      .subscribe(res => {
        this.skills = res.data;
      });

    this.statusSubscription = this.requestsService
      .getStatus()
      .toPromise()
      .then(res => this.statuses = res);

    this.requestDetailsSubscription = this.requestsService
      .getRequestDetails(this.requestId)
      .toPromise()
      .then((res) => {
        this.details = res.data;
        this.details['pairing_days'] = res.data['pairing'].days;
        this.getUserDetails(res.data.interested)
      });
  }

  ngOnDestroy() {
    this.skillSubscription.unsubscribe();
    this.statusSubscription.unsubscribe();;
    this.requestDetailsSubscription.unsubscribe();;
  }

  /**
   * fetches mentor details
   * 
   * @param {Array} interested - list of interested mentor ids
   * @return {Null}
   */
  getUserDetails (interested: Array<string>) {
    if (!interested) return;

    interested.map((mentorId) => {
      this.userDetailService.getUserDetails(mentorId)
        .subscribe(
          mentorDetails => this.interestedMentors.push(mentorDetails),
          error => this.errors['GET_MENTOR_DETAIL_ERR'] = error
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

    const requestUpdate = {
      mentor_id: mentorDetail['id'],
      mentee_name: this.auth.userInfo.name,
      match_date: currentDate
    };

    this.requestsService.matchMenteeRequest(this.requestId, requestUpdate)
      .toPromise()
      .then(res => {
        this.loading = false;
        this.mentorMatched = true;
        this.successMsg = `Thank you. You have been matched with ${mentorDetail['name']}!`;
        this.snackBarOpen(true);
      })
      .catch(error => {
        this.errors['MENTORSHIP_MATCH_ERROR'] = error;
        this.snackBarOpen(false);
      });
  }

  /**
   * triggers snackbar
   * 
   * @param {Boolean} status
   * @return {Null}
   */
  private snackBarOpen(status: Boolean) {
    if (!status) {
      return this.snackbar
        .open('Failed to Match Request! Try again.', 'close', this.snackBarConfig);
    }

    this.snackbar
      .open('Mentorship Request Matched', 'close', this.snackBarConfig)
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
}
