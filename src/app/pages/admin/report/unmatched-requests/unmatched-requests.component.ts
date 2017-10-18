import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from '../../../../services/request.service';

@Component({
  selector: 'app-unmatched-requests-report',
  templateUrl: './unmatched-requests.component.html',
  styleUrls: ['./unmatched-requests.component.scss'],
})
export class UnmatchedRequestsReportComponent implements OnInit {
  locations: {};
  skills: any[];
  selectedLocation: string;
  loading: boolean;
  lineDelimiter: string;
  unmatchedRequests: any[];
  @Input() currentPage;
  @Input() itemsPerPage;
  @Input() totalItems;

  constructor(
    private requestService: RequestService,
  ) {
    this.skills = [];
    this.unmatchedRequests = [];
    this.locations = {
      All: '',
      Lagos: 'Lagos',
      Nairobi: 'Nairobi',
    };
    this.selectedLocation = '';
    this.loading = false;
    this.lineDelimiter = '\r\n';
  }

  ngOnInit() {
    this.getReports();
  }

  /**
   * returns options for dropdown
   *
   * @param {String} content
   * @return {Array}
   */
  getDropdownOptions(content: string) {
    return Object.keys(this[content]);
  }

  /**
   * gets all reports from request service
   *
   * @param {number} page Current page number
   *
   * @return {void}
   */
  getReports(page = 1): void {
    this.currentPage = page;
    const params = {
      location: this.selectedLocation,
      limit: 20,
      page: this.currentPage,
    };

    this.loading = true;
    this.requestService.getUnmatchedRequests(params)
      .subscribe((response) => {
        this.loading = false;
        this.unmatchedRequests = response.requests;
        this.itemsPerPage = response.pagination['pageSize'];
        this.totalItems = response.pagination['totalCount'];
      });
  }

  /**
   * fetches new report when location or period changes
   *
   * @param {Event} event - change event
   * @return {Void}
   */
  reloadReport(event): void {
    if (this.locations.hasOwnProperty(event.value)) {
      this.selectedLocation = this.locations[event.value];
    }
    this.getReports();
  }
}
