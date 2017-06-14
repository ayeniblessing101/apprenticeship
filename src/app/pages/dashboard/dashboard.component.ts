import {Component, OnInit } from '@angular/core';
import { MdSnackBar, MdDialog } from '@angular/material';
import { RequestService } from '../../services/request.service';
import { FilterService } from '../../services/filter.service';
import { SkillService } from '../../services/skill.service';
import { HelperService as Helper } from '../../services/helper.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { SlackModalDialogComponent } from '../../components/slack-modal-dialog/slack-modal-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  errorMessage: string;
  requests: any;
  filteredSkills: any[] = [];
  checkedStatuses: any[] = [];
  autoFilterStatus: boolean;
  dashBoardFilters: any = {
    Primary: [],
    Status: [],
  };
  slackHandle: string;

  constructor(
    private requestService: RequestService,
    private filterService: FilterService,
    private skillService: SkillService,
    private authService: AuthService,
    private userService: UserService,
    public snackBar: MdSnackBar,
    public helper: Helper,
    private dialog: MdDialog,
  ) {
    this.autoFilterStatus = true;
  }

  ngOnInit() {
    if (this.authService.notice === 'unauthorized') {
      this.snackBar.open('You are not authorized to view the Admin page', 'Unathorized', {
        duration: 8000,
      });
    }

    this.getRequests();
    this.getSkills();
    this.getStatus();
    this.openModal();
  }

  /**
   *  getRequests
   *
   *  gets 20 requests from the Lenken API service
   */
  getRequests() {
    this.requestService.getRequests(20)
      .subscribe(
        (requests) => this.requests = requests,
        error => this.errorMessage = <any>error,
      );
  }

   /**
    * checks if the logged in user is the owner of the request
    *
    * @param {object} request mentorshp request to verify
    *
    * @return {boolean} whether or not the logged in user owns the request
    */
   isRequestOwner(request: any): boolean {
    return request.mentee_id === this.authService.userInfo.id;
   }

   /**
    * getSkills
    *
    * gets skills from the Lenken API service
    *
    */
   getSkills() {
    this.skillService.getSkills()
      .subscribe(
        skills => this.dashBoardFilters.Primary = skills,
        error => this.errorMessage = <any>error,
      );
   }

   /**
    * getStatus
    *
    * gets statuses from the Lenken API service
    */
   getStatus() {
    this.requestService.getStatus()
      .subscribe(
        status => this.dashBoardFilters.Status = status,
        error => this.errorMessage = <any>error,
      );
   }

   /**
    *  openModal
    *
    *  renders a modal if the user
    *  has not provided their slack handle
    *  when they log in
    */
   openModal() {
    this.userService.checkSlackHandleStatus(this.authService.userInfo.id)
      .subscribe((data) => {
        if (data.slackHandle == null) {
          this.dialog.open(SlackModalDialogComponent);
        }
      });
   }

  /**
    * function that handles the event emitted from the
    * <app-filters> child component
    *
    * @param {object} eventData Object that contains,
    * the event emitted, the filter selected
    * and the value of the filter selected
    */
   dashboardFilter(eventData) {
    if (eventData.filterName === 'Primary') {
      // toggle clicked primary skill
      if (eventData.eventType) {
        this.filteredSkills.push(eventData.itemName);
      } else {
        const pos = this.filteredSkills.indexOf(eventData.itemName);
        this.filteredSkills.splice(pos, 1);
      }
    } else if (eventData.filterName === 'Status') {
      // toggle clicked status
      if (eventData.eventType) {
        this.checkedStatuses.push(eventData.itemName);
      } else {
        const pos = this.checkedStatuses.indexOf(eventData.itemName);
        this.checkedStatuses.splice(pos, 1);
      }
    }
  }
}
