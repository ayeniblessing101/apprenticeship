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
  };
  selectedLocation: any[] = [];
  totalRequests: number;
  locations: object = {
    All: '',
    Nigeria: 'Lagos',
    Kenya: 'Nairobi',
    Uganda: 'Uganda',
  };
  activeLocations: object;
  requests: object = {
    'Total Requests': 0,
    'Open Requests': 0,
    'Completed Requests': 0,
    'Cancelled Requests': 0,
  };
  selectedStatus = 'Total Requests';

  constructor(
    private requestService: RequestService,
  ) {}

  ngOnInit() {
    this.activeLocations = {
      All: true,
      Nigeria: false,
      Kenya: false,
      Uganda: false,
    }
    this.applyFilters.emit(this.appliedFilters);
    this.getRequestStatistics(this.selectedLocation);
  }

  /**
   * Returns options for filters and statistics
   *
   * @param {String} content
   * @return {Array}
   */
  getOptions(content: string) {
    return Object.keys(this[content]);
  }

  /**
   * Gets all statistics from request service
   *
   * @param {String} location
   *
   * @return {Void}
   */
  getRequestStatistics(locations): void {
    const options = {
      locations,
    };

    this.requestService.getRequestStatistics(options)
      .toPromise()
      .then((statistics) => {
        this.requests['Total Requests'] = statistics.totalRequests;
        this.requests['Open Requests'] = statistics.totalOpenRequests;
        this.requests['Cancelled Requests'] = statistics.totalCancelledRequests;
        this.requests['Completed Requests'] = statistics.totalCompletedRequests;
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
  reloadRequestsOnLocationChange(event): void {
    this.appliedFilters['type'] = [false, false];
    const location = event.target.value;
    if (event.target.checked) {
      this.appliedFilters.locations.push(this.locations[location]);
      this.selectedLocation.push(this.locations[location]);
    } else {
      const unCheckedLocation = this.appliedFilters.locations.indexOf(this.locations[location])
      this.appliedFilters.locations.splice(unCheckedLocation, 1);
      const unCheckedLocationStatistics = this.selectedLocation.indexOf(this.locations[location])
      this.selectedLocation.splice(unCheckedLocationStatistics, 1);
    }
    this.getRequestStatistics(this.selectedLocation);
    this.applyFilters.emit(this.appliedFilters);
  }

  /** Fetches new records based on selected status
   *
   * @param  {Event} event
   *
   * return {Void}
   */
  reloadRequestsOnStatusChange(status) {
    this.selectedStatus = status;
    let status_id;
    switch (status) {
      case 'Open Requests':
        status_id = 1;
        break;
      case 'Cancelled Requests':
        status_id = 4;
        break;
      case 'Completed Requests':
        status_id = 3;
        break;
      default:
        status_id = '';
    }
    this.appliedFilters.status = status_id;
    this.applyFilters.emit(this.appliedFilters)
  }
}
