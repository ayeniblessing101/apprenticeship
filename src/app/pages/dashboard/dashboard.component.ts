import {Component, OnInit, Input } from '@angular/core';
import { MdSnackBar, MdDialog } from '@angular/material';
import { RequestService } from '../../services/request.service';
import { FilterService } from '../../services/filter.service';
import { SkillService } from '../../services/skill.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

import { SegmentService } from '../../services/segment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  errorMessage: string;
  requests: any;
  selectedSkillsId: any[] = [];
  selectedStatusesId: any[] = [];
  autoFilterStatus: boolean;
  dashBoardFilters: any = {
    Primary: [],
    Status: [],
  };
  loading: boolean;
  @Input() currentPage;
  @Input() itemsPerPage;
  @Input() totalItems;
  userId: string;
  userLevel: string;

  constructor(
    private requestService: RequestService,
    private filterService: FilterService,
    private skillService: SkillService,
    private authService: AuthService,
    private userService: UserService,
    private segmentService: SegmentService,
    public snackBar: MdSnackBar,
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
    this.loading = false;

    this.getRequests(this.currentPage);
    this.getSkills();
    this.getStatus();
  }

  /**
   * Get 20 create-request from the Lenken API service
   *
   * @param {Number} page - the page number to view.
   */
  getRequests(page: number) {
    this.currentPage = page;
    this.loading = true;
    let params = {
      skills: this.selectedSkillsId,
      status: this.selectedStatusesId,
    };

    this.requestService.getRequests(20, page, params)
      .toPromise()
      .then(
        (response) => {
          this.loading = false;
          this.requests = response.requests,
          this.itemsPerPage = response.pagination['pageSize'],
          this.totalItems = response.pagination['totalCount']
        },
      )
      .catch(error => this.errorMessage = error);
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
        this.selectedSkillsId.push(eventData.itemId);
      } else {
        const pos = this.selectedSkillsId.indexOf(eventData.itemId);
        this.selectedSkillsId.splice(pos, 1);
      }

    } else if (eventData.filterName === 'Status') {
      // toggle clicked status
      if (eventData.eventType) {
        this.selectedStatusesId.push(eventData.itemId);
      } else {
        const pos = this.selectedStatusesId.indexOf(eventData.itemId);
        this.selectedStatusesId.splice(pos, 1);
      }
    }

    this.getRequests(1);
  }
}
