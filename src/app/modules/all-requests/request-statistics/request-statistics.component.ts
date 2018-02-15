import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RequestService } from './../../../services/request.service';

@Component({
  selector: 'app-request-statistics',
  templateUrl: './request-statistics.component.html',
  styleUrls: ['./request-statistics.component.scss'],
})
export class RequestStatisticsComponent implements OnInit {
  @Output() applyFilters = new EventEmitter<any>();
  appliedFilters = {
    category: ['all'],
    type: [false, false],
    locations : [],
    status: [],
    startDate: '',
    endDate: '',
  };
  selectedLocation: any[] = [];
  totalRequests: number;
  locations = ['All', 'Lagos', 'Nairobi', 'Kampala'];
  location = 'All';
  requests = [
    { status: 'Total Requests', statistic: 0 },
    { status: 'Open Requests', statistic: 0 },
    { status: 'Matched Requests', statistic: 0 },
    { status: 'Completed Requests', statistic: 0 },
    { status: 'Cancelled Requests', statistic: 0 },
  ];
  selectedStatus = 'Total Requests';
  headerName = 'All Requests';

  constructor(
    private requestService: RequestService,
  ) {}

  ngOnInit() {
    this.applyFilters.emit(this.appliedFilters);
    this.getRequestStatistics();
  }

  /**
   * Gets all statistics from request service
   *
   * @param {String} location
   *
   * @return {Void}
   */
  getRequestStatistics(): void {
    const options = {
      locations: this.selectedLocation,
      start_date: this.appliedFilters.startDate,
      end_date: this.appliedFilters.endDate,
    };

    this.requestService.getRequestStatistics(options)
      .toPromise()
      .then((statistics) => {
        this.requests[0].statistic = statistics.total;
        this.requests[1].statistic = statistics.open;
        this.requests[2].statistic = statistics.matched;
        this.requests[3].statistic = statistics.completed;
        this.requests[4].statistic = statistics.cancelled;
      },
    )
  }

  /**
   * Fetches new statistics and requests when location changes
   *
   * @param {Event} event - change event
   *
   * @return {Void}
   */
  reloadRequestsOnLocationChange(location: string): void {
    this.location = location;
    const city = location === 'All' ? '' : location;
    this.appliedFilters.locations[0] = city;
    this.selectedLocation[0] = city;
    this.getRequestStatistics();
    this.applyFilters.emit(this.appliedFilters);
  }

  /** Fetches new records based on selected status
   *
   * @param  {Event} event
   *
   * return {Void}
   */
  reloadRequestsAndHeaderOnStatusChange(status) {
    this.selectedStatus = status;
    let status_id;
    switch (status) {
      case 'Open Requests':
        status_id = 1;
        break;
      case 'Cancelled Requests':
        status_id = 4;
        break;
      case 'Matched Requests':
        status_id = 2;
        break;
      case 'Completed Requests':
        status_id = 3;
        break;
      default:
        status_id = '';
    }
    this.appliedFilters.status = status_id;
    this.applyFilters.emit(this.appliedFilters)
    // sets the header name based on selected status
    if (this.selectedStatus === 'Total Requests') {
      this.headerName = 'All Requests'
    } else {
      this.headerName = this.selectedStatus;
    }
  }

  /**
   * Set the start date
   * @param {string} date - The date specified.
   *
   * @returns {void}
   */
  setStartDate(date: string) {
    this.appliedFilters.startDate = date;
    this.reloadRequestsOnDateChange();
  }

  /**
   * Set the end date
   * @param {string} date - The date specified.
   *
   * @returns {void}
   */
  setEndDate(date: string) {
    this.appliedFilters.endDate = date;
    this.reloadRequestsOnDateChange();
  }

  /**
   * Reload requests on date change (Start and End date)
   *
   * @returns {void}
   */
  reloadRequestsOnDateChange() {
    if (this.appliedFilters.startDate && this.appliedFilters.endDate) {
      this.applyFilters.emit(this.appliedFilters);
      this.getRequestStatistics();
    }
  }

}
