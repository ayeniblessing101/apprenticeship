import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { RequestService } from '../../services/request.service';
import { FilterService } from '../../services/filter.service';


@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit, OnDestroy {
  public allRequests: Array<Object> = [];
  public requestedBy: string;
  public loading: boolean;
  public dateRange: any[];
  private limit: number;
  private filteredSkills: any[] = [];
  private checkedStatuses: any[] = [];
  private statusFilterSubscription: any;

  constructor(private requestService: RequestService, private filterService: FilterService) {
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
  extractRequest(requestsArray: Array<Object>): void {
    requestsArray.forEach(request => {
      this.allRequests.push(request);
    });
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
  * watches for any changes in the checkedSkills and selectedDateRange arrays in the filters service
  * @return {Void}
  */
  watchFilters(): void {
    this.filterService.getCheckedSkills()
      .subscribe(skills => this.filteredSkills = skills);
    this.statusFilterSubscription = this.filterService.getCheckedStatuses()
      .subscribe(statuses => {
        const indexOfOpen = statuses.indexOf('open');
        if (indexOfOpen > -1) statuses.splice(indexOfOpen, 1);
        this.checkedStatuses = statuses;
      });
    this.filterService.getSelectedDateRange()
      .subscribe(range => this.dateRange = range);
  }
}
