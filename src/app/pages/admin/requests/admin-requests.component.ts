import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MdDialog, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { FilterService } from '../../../services/filter.service';
import { RequestService } from '../../../services/request.service';
import { SkillService } from '../../../services/skill.service';
import { CancelRequestDialogComponent } from '../../../components/cancel-request/cancel-request.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.scss'],
})
export class AdminRequestsComponent implements OnInit, OnDestroy {
  private errorMessage: string;
  requests: any= [];
  requestsIds: any[] =  [];
  requestedBy: string;
  loading: boolean;
  dateRange: number;
  dateFilters: any;
  dateRangeMap = [];
  limit: number;
  selectedSkillsId: any[] = [];
  selectedStatusesId: any[] = [];
  showSearch: true;
  roles: any[] = [];
  adminFilters: any = {
    Role: ['mentor', 'mentee'],
    Date: [],
    Primary: [],
    Status: [],
  };
  searchTerm: any;
  @Input() currentPage;
  @Input() itemsPerPage;
  @Input() totalItems;

  // Filter Subscriptions Refs
  requestSubscription: any;
  statusFilterSubscription: any;
  skillsFilterSubscription: any;
  params: any= {};

  constructor(
    private requestService: RequestService,
    private filterService: FilterService,
    private skillService: SkillService,
    private snackbar: MdSnackBar,
    private route: ActivatedRoute,
    private dialog: MdDialog,

  ) {
    filterService.statusResult.subscribe((response) => {
      this.extractRequest(response)
    });

    this.requestedBy = 'Abolaji Femi';
    this.limit = 10;
    this.loading = false;
    this.dateRange = 0;
    this.dateFilters = {
      'Last day': 1,
      'Last 7 days': 7,
      'Last 14 days': 14,
      'Last month': 30,
      'All time': 0,
    };

    const dates = Object.keys(this.dateFilters);
    dates.forEach(date => this.dateRangeMap.push({ name: date }));
  }

  ngOnInit() {
    this.getRequests(this.currentPage);
    this.getDate();
    this.getSkills();
    this.getStatus();
  }

  ngOnDestroy() {
    this.requestSubscription.unsubscribe();
    this.statusFilterSubscription.unsubscribe();
    this.skillsFilterSubscription.unsubscribe();
  }

  /**
   * gets all requests from request service
   *
   * @param {Number} page - number of current page been displayed
   * @return {Void}
   */
  getRequests(page: number): void {
    this.currentPage = page;
    this.loading = true;
    this.params['skills'] = this.selectedSkillsId;
    this.params['status'] = this.selectedStatusesId;
    this.params['period'] = this.dateRange;
    this.requestSubscription = this.requestService.getRequests(20, page, this.params)
      .subscribe((response) => {
        this.loading = false;
        this.extractRequest(response.requests);
        this.itemsPerPage = response.pagination.pageSize;
        this.totalItems = response.pagination.totalCount;
      });
  }

  /**
   * gets all requests from request service
   *
   * @param {Number} limit - number of requests to return
   * @return {Void}
   */
  searchRequests(term: string): void {
    this.currentPage = 1;
    this.searchTerm = term;
    this.params['q'] = this.searchTerm;
    this.requestSubscription = this.requestService.getRequests(20, this.currentPage, this.params)
      .subscribe((response) => {
        this.loading = false;
        this.extractRequest(response.requests);
        this.itemsPerPage = response.pagination.pageSize;
        this.totalItems = response.pagination.totalCount;
      });
  }

  /**
   * pushes each request into a request array;
   *
   * @param {Array} requests - Array of requests
   * @return {Void}
   */
  extractRequest(requestsArray) {
    let newRequestIds = [];
    this.requests = [];
    this.requestsIds = this.getRequestId(this.requests);
    newRequestIds = this.getRequestId(requestsArray);
    newRequestIds.forEach((id) => {
      if (!this.requestsIds.includes(id)) {
        const newResult = requestsArray.filter((result) => {
          return result.id === id;
        });

        this.requests.push(newResult[0]);
        this.requestsIds.push(id);
      }
    });
  }

  /**
   * Retrieves the id of incoming requests and stores in an array
   *
   * @param {Array} requests
   * @return {Array} result
   */
  getRequestId(requests) {
    return requests.map(request => request.id);
  }

  /**
   * Retrieves the full name from the passed email
   *
   * @param {String} email
   * @return {String} username
   */
  getName(email) {
    if (!email) {
      return email;
    }

    // remove the '@' email suffix to get the user's full name
    let userName = email.match(/(.+)@/);
    userName = userName[1].split('.');

    return userName.join(' ').replace(/\w\S*/g, (txt => txt[0]
      .toUpperCase() + txt.substr(1).toLowerCase()));
  }

/**
   * Retrieves the full name of mentor from the mentor's id
   *
   * @param {String} email
   * @return {String} username
   */


  /**
   * returns a css class for chips based on request status
   *
   * @param {String} status - request status
   * @return {String} statusClass - css class
   */
  getStatusClass(status: string): string {
    let statusClass = '';

    switch (status.toLowerCase()) {
      case 'open': statusClass = 'rounded-chip-open'; break;
      case 'completed': statusClass = 'rounded-chip-completed'; break;
      case 'cancelled': statusClass = 'rounded-chip-cancelled'; break;
      default: statusClass = 'rounded-chip-matched';
    }

    return statusClass;
  }

  /**
   * getDate
   *
   * Adds the date filter
   */
  getDate() {
    this.adminFilters.Date = this.dateRangeMap;
  }

  /**
   * getSkills
   *
   * Gets skills from the Lenken api
   */
  getSkills() {
    this.skillsFilterSubscription = this.skillService.getSkills()
      .subscribe(
        skills => this.adminFilters.Primary = skills,
        error => this.errorMessage = <any>error,
      );
  }

  /**
   * getStatus
   *
   * Gets statuses from the Lenken api
   */
  getStatus() {
    this.statusFilterSubscription = this.requestService.getStatus()
      .subscribe(
        status => this.adminFilters.Status = status,
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
  adminFilter(eventData) {
    if (eventData.filterName === 'Primary') {
      if (eventData.eventType) {
        this.selectedSkillsId.push(eventData.itemId);
      } else {
        const pos = this.selectedSkillsId.indexOf(eventData.itemId);
        this.selectedSkillsId.splice(pos, 1);
      }
    } else if (eventData.filterName === 'Status') {
      if (eventData.eventType) {
        this.selectedStatusesId.push(eventData.itemId);
      } else {
        const pos = this.selectedStatusesId.indexOf(eventData.itemId);
        this.selectedStatusesId.splice(pos, 1);
      }
    } else if (eventData.filterName === 'Date') {
      this.dateRange = this.dateFilters[eventData.itemValue];
    } else if (eventData.filterName === 'Role') {
      if (eventData.eventType) {
        this.roles.push(eventData.itemId);
      } else {
        const pos = this.roles.indexOf(eventData.itemId);
        this.roles.splice(pos, 1);
      }
    }
    this.getRequests(1);
  }

  /**
   * Cancels a request
   *
   * @param {Number} requestId ID of the request to cancel
   *
   * @return {Null}
   */
  cancelRequest(requestId: number): void {
    const snackBarConfig = new MdSnackBarConfig();
    snackBarConfig.duration = 3000;

    const dialogRef = this.dialog.open(CancelRequestDialogComponent);
    dialogRef.afterClosed().toPromise().then((result) => {
      if (result.action) {
        this.requestService.cancelRequest(requestId, result.reason)
          .toPromise().then(() => {
            this.getRequests(this.currentPage);

            this.snackbar.open(
              'Request cancelled',
              'close',
              snackBarConfig);
          })
          .catch((error) => {
            this.snackbar.open(
              error,
              'close',
              snackBarConfig);
          });
      }
    });
  }
}
