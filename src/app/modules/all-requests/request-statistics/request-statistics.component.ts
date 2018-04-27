import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { RequestService } from './../../../services/request.service';
import { RequestSkillPipe } from '../../../pipes/request-skills-pipe';
import { RequestDurationPipe } from '../../../pipes/request-duration.pipe';
import { RequestStatuses } from '../../../enums/request-statuses.enum';
import { AlertService } from '../../../services/alert.service';
import { CSVDownloadHelper } from '../../../helpers/csv-download.helper';
import { CSVHeader } from '../../../interfaces/csv-header.interface';

@Component({
  selector: 'app-request-statistics',
  templateUrl: './request-statistics.component.html',
  styleUrls: ['./request-statistics.component.scss'],
  providers: [RequestSkillPipe, RequestDurationPipe, DatePipe],
})
export class RequestStatisticsComponent implements OnInit {
  @Output() applyFilters = new EventEmitter<any>();
  appliedFilters = {
    category: ['all'],
    type: [false, false],
    locations: [],
    status: [],
    startDate: moment().subtract(1, 'month').format('DD-MM-YYYY'),
    endDate: moment().format('DD-MM-YYYY'),
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
  isExportingRequestsCsv = false;
  maximumDate = moment().format('DD-MM-YYYY');

  constructor(
    private requestService: RequestService,
    private requestSkillPipe: RequestSkillPipe,
    private requestDurationPipe: RequestDurationPipe,
    private datePipe: DatePipe,
    private alert: AlertService,
    private csvDownloadHelper: CSVDownloadHelper,
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
    this.applyFilters.emit(this.appliedFilters);
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

  /**
   * Exports Requests to CSV File
   *
   * @returns {void}
   */
  exportRequests() {
    let limit: number;
    const page = null;
    const downloadLink = document.createElement('a');
    this.isExportingRequestsCsv = true;

    if (!this.appliedFilters.endDate || !this.appliedFilters.startDate) {
      this.alert.showMessage('Start Date and End Date is required!');
      this.isExportingRequestsCsv = false;
      return;
    }

    for (const status of this.requests) {
      if (status.status === this.selectedStatus) {
        limit = status.statistic;
      }
    }

    this.requestService.getRequests(limit, page, this.appliedFilters)
      .toPromise()
      .then((response) => {
        const requests = response.requests;
        const fileName = `${this.createFileName()}`;
        const headers: CSVHeader[] = [
          { key: 'title', displayName: 'Request' },
          { key: 'mentee', displayName: 'Mentee' },
          { key: 'mentor', displayName: 'Mentor' },
          { key: 'primarySkill', displayName: 'Primary Skill' },
          { key: 'secondarySkill', displayName: 'Secondary Skill' },
          { key: 'duration', displayName: 'Preferred Duration' },
          { key: 'dateAdded', displayName: 'Date Added' },
          { key: 'location', displayName: 'Location' },
          { key: 'status', displayName: 'Status' },
        ];

        const records: object[] = requests.map((request) => {
          const sampleRequest = { ...request };
          sampleRequest.mentee = sampleRequest.mentee.fullname;
          sampleRequest.mentor = sampleRequest.mentor.fullname;
          sampleRequest.primarySkill = this.requestSkillPipe.transform(sampleRequest.request_skills, 'primary');
          sampleRequest.secondarySkill = this.requestSkillPipe.transform(sampleRequest.request_skills, 'secondary');
          sampleRequest.duration = this.requestDurationPipe.transform(sampleRequest.duration);
          sampleRequest.dateAdded = this.datePipe.transform(sampleRequest.created_at);
          sampleRequest.status = RequestStatuses[sampleRequest.status_id];
          return sampleRequest;
        });

        this.csvDownloadHelper.downloadCSV(records, headers, fileName);
        this.isExportingRequestsCsv = false;
      });
  }

  /**
   * Creates a file name following the format <start_date>-<end_date>-<location>-<status>.csv
   *
   * @return(void)
   */
  createFileName() {
    const startDate = this.appliedFilters.startDate ? this.formatDate(this.appliedFilters.startDate) : '';
    const endDate = this.appliedFilters.endDate ? this.formatDate(this.appliedFilters.endDate) : '';
    const location = this.getLocationCode(this.location);
    return `${startDate} - ${endDate} - ${location} - ${this.selectedStatus}.csv`;
  }

  /**
   * Gets location code
   *
   * @param {String} location - Location to get abbreviation for.
   *
   * @return {string} - Location Abbreviation
   */
  getLocationCode(selectedLocation) {
    const locations = [
      { name: 'All', locationCode: 'All' },
      { name: 'Lagos', locationCode: 'LOS' },
      { name: 'Nairobi', locationCode: 'NBO' },
      { name: 'Kampala', locationCode: 'KLA' },
    ];

    for (const location of locations) {
      if (selectedLocation === location.name) {
        return location.locationCode;
      }
    }
  }

  /**
   * Format date to 'DD MM, YYYY' Eg. 20th March, 2018
   *
   * @param {Date} date - Selected date
   *
   * @returns {Date}
   */
  formatDate(date) {
    return moment(date, 'DD-MM-YYYY').format('Do MMMM, YYYY');
  }
}
