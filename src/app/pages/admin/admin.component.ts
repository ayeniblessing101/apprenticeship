import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { RequestService } from '../../services/request.service';
import { FilterService } from '../../services/filter.service';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  private allRequests: Array<Object> = [];
  private requestedBy: string = 'Abolaji Femi';
  private limit: number = 10;
  private loading: boolean = false;
  private filteredSkills: any[] = [];

  constructor (
    private requests: RequestService,
    private filterService: FilterService) {}

  ngOnInit() {
    this.getRequests(this.limit);
    this.watchFilters();
  }

  /**
   * gets all requests from request service
   *
   * @param {Number} limit - number of requests to return
   * @return {Void}
   */
  getRequests(limit: number): void {
    this.loading = true;
    this.requests.getRequests(limit)
      .subscribe(requests => {
        this.loading = false;
        this.extractRequest(requests);
      });
  }

  /**
   * pushes each request into a request array
   *
   * @param {Array} requestsArray - Array of requests
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
    let statusClass: string = '';

    switch (status.toLowerCase()) {
      case 'open': statusClass = 'rounded-chip-open'; break;
      case 'closed': statusClass = 'rounded-chip-closed'; break;
      default: statusClass = 'rounded-chip-matched';
    }

    return statusClass;
  }

  /**
   *  watches for any changes in the checkedSkills arrays in the filters service
   *
   * @return {Void}
   */
  watchFilters(): void {
    this.filterService.getCheckedSkills()
      .subscribe(skills => this.filteredSkills = skills);
  }
}
