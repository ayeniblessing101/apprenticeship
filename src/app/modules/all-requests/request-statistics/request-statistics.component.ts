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
  locations = [
    { name: 'All', value: '', isSelected: true },
    { name: 'Nigeria', value: 'Lagos', isSelected: false },
    { name: 'Kenya', value: 'Nairobi', isSelected: false },
    { name: 'Uganda', value: 'Kampala', isSelected: false },
  ];
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
    this.getRequestStatistics(this.selectedLocation);
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
  reloadRequestsOnLocationChange(event): void {
    const location = event.target.value

    if (event.target.checked) {
      this.appliedFilters.locations.push(location);
      this.selectedLocation.push(location);
    } else {
      const unCheckedLocation = this.appliedFilters.locations.indexOf(location)
      this.appliedFilters.locations.splice(unCheckedLocation, 1);
      const unCheckedLocationStatistics = this.selectedLocation.indexOf(location)
      this.selectedLocation.splice(unCheckedLocationStatistics, 1);
    }

    this.selectAllCheckbox();
    this.getRequestStatistics(this.selectedLocation);
    this.applyFilters.emit(this.appliedFilters);
  }

  /**
   * Automatically deselects the All location checkbox when
   * less than all the rest of the checkboxes are selected,
   * and automatically selects the All checkbox when all the
   * rest of the checkboxes are selected.
   *
   * @return {Void}
   */
  selectAllCheckbox() {
    let allAreChecked = true;
    for (let i = 1; i < this.locations.length; i++) {
      if (!this.locations[i].isSelected) {
        allAreChecked = false;
        break;
      }
    }
    this.locations[0].isSelected = allAreChecked;
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
}
