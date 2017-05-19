import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { RequestService } from '../../services/request.service';
import { FilterService } from '../../services/filter.service';


@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit, OnDestroy {
  allRequests: Array<Object> = [];
  allRequestsIds: any[] =  [];
  requestedBy: string;
  loading: boolean;
  dateRange: any[];
  limit: number;
  filteredSkills: any[] = [];
  checkedStatuses: any[] = [];

  // Filter Subscriptions
  statusFilterSubscription: any;
  skillsFilterSubscription: any;
  dateFilterSubscription: any;

  constructor(
    private requestService: RequestService,
    private filterService: FilterService
  ) {
    filterService.statusResult.subscribe(response => {
      this.extractRequest(response)
    });
    this.requestedBy = 'Abolaji Femi';
    this.limit = 10;
    this.loading = false;
    this.dateRange = [0];
  }

  ngOnInit() {
    this.getRequests(this.limit);
    this.watchFilters();
  }

  ngOnDestroy() {
    this.statusFilterSubscription.unsubscribe();
    this.skillsFilterSubscription.unsubscribe();
    this.dateFilterSubscription.unsubscribe();
  }

  /**
   * gets all requests from request service
   *
   * @param {Number} limit - number of requests to return
   * @return {Void}
   */
  getRequests(limit: number): void {
    this.loading = true;
    this.requestService.getRequests(limit)
      .subscribe(requests => {
        this.loading = false;
        this.extractRequest(requests);
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
    this.allRequestsIds = this.getRequestId(this.allRequests);
    newRequestIds = this.getRequestId(requestsArray);
    newRequestIds.forEach(id => {
      if (!this.allRequestsIds.includes(id)) {
        const newResult = requestsArray.filter((result) => {
          return result.id == id;
        });
        this.allRequests.push(newResult[0]);
        this.allRequestsIds.push(id);
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
    let result = [];
    requests.map(request => result.push(request.id));

    return result;
  }

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
      case 'closed': statusClass = 'rounded-chip-closed'; break;
      default: statusClass = 'rounded-chip-matched';
    }

    return statusClass;
  }

  /**
  * watchFilters
  *
  * watches for any changes in any of the filter types in the filters service
  * @return {Void}
  */
  watchFilters(): void {
    this.skillsFilterSubscription = this.filterService.getCheckedSkills()
      .subscribe(skills => this.filteredSkills = skills);

    this.statusFilterSubscription = this.filterService.getCheckedStatuses()
      .subscribe((statuses) => {
        const indexOfOpen = statuses.indexOf('open');

        if (indexOfOpen > -1) {
          statuses.splice(indexOfOpen, 1);
        }

        this.checkedStatuses = statuses;

        this.filterService
          .getAllRequestsByStatus(
            this.checkedStatuses[this.checkedStatuses.length - 1]
          )
          .subscribe((requests) => {
            this.extractRequest(requests);
          });
      });

    this.dateFilterSubscription = this.filterService.getSelectedDateRange()
      .subscribe(range => this.dateRange = range);
  }
}
