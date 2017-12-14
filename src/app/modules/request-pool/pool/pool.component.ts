import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { FilterService } from '../../../services/filter.service';

import * as moment from 'moment';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss'],
})
export class PoolComponent implements OnInit {
  showRequest = false;
  currentPage = 1;
  limit = 20;
  loading: boolean;
  loadingRequests: boolean;
  isSaveFiltersModalOpened: boolean;
  selectedRequest: object;
  requests = [];
  filterParams: any = {};
  savedFiltersNames: string[];

  constructor(private requestService: RequestService,
              private filterService: FilterService) {
  }

  ngOnInit() {
    this.isSaveFiltersModalOpened = false;
    const savedFilters = JSON.parse(localStorage.getItem('savedFilters'));
    this.savedFiltersNames = savedFilters ? Object
      .keys(savedFilters) : [];
    this.filterParams = this.filterService.getFilters();
    this.getRequests();
  }

  /**
   * Closes filter save filter modal
   *
   * @param {boolean}  event event emmited when Dismiss button
   * of  save filter modal is clicked
   *
   * @return {void}
   */
  closeSaveFiltersModal() {
    this.isSaveFiltersModalOpened = false;
  }

  /**
   * Opens save filter modal
   *
   * @param {boolean} event Event fired when
   * save Filters is clicked
   *
   * @returns {void}
   */
  openSaveFiltersModal() {
    this.isSaveFiltersModalOpened = true;
  }

  /**
   * Updates names of all saved filers each time a new filter is saved
   *
   * @param {string[]} event fired after a filter is saved
   *
   * @returns {void}
   */
  updateSavedFiltersNames(event) {
    this.savedFiltersNames = event;
  }

  /** Get details of the request clicked by the user
   * in the request pool. Changes showRequest to true
   * making the modal pop up
   *
   * @param {Object} request - the clicked request details
   *
   * @return {void}
   */
  showRequestDetails(request) {
    this.selectedRequest = request;
    this.showRequest = true;
  }

  /**
   * Changes showRequest to false and closes
   * the modal
   *
   * @return {void}
   */
  closeRequest() {
    this.showRequest = false;
  }

  /**
   * Get requests from the Lenken API service
   *
   * @return {void}
   */
  getRequests(): void {
    this.loadingRequests = true;
    this.currentPage = 1;
    this.requestService.getRequests(this.limit, this.currentPage, this.filterParams)
      .toPromise()
      .then((response) => {
        this.requests = this.formatRequestData(response.requests);
        this.loadingRequests = false;
      },
    )
  }

  /**
   * Fetches request on page scroll
   *
   * @return {void}
   */
  onScroll(): void {
    this.loadingRequests = true;
    this.currentPage += 1;
    this.requestService.getRequests(this.limit, this.currentPage, this.filterParams)
      .toPromise()
      .then((response) => {
        // concatenate new request data with previous data
        this.requests = [
          ...this.requests,
          ...this.formatRequestData(response.requests),
        ];
        this.loadingRequests = false;
      });
  }

  /**
   * Formats request data to be displayed
   *
   * @param {Array} requests - contains an array of requests.
   *
   * @return {Array} formatted request data
   */
  formatRequestData(requests): any {
    const requestData = requests.map((request) => {
      const primarySkills = [];
      const secondarySkills = [];
      request.request_skills.forEach(({ type, name }) => {
        switch (type) {
          case 'primary':
            primarySkills.push(name);
            break;
          case 'secondary':
            secondarySkills.push(name);
            break;
        }
      });

      request.primarySkills = primarySkills.slice(0, 2).join(', ');
      request.secondarySkills = secondarySkills.slice(0, 2).join(', ');
      request.duration = request.duration > 1 ?
        `${request.duration} Months` : `${request.duration} Month`;

      request.date = moment(request.created_at).format('MMMM DD, YYYY');

      return request;
    });

    return requestData;
  }

  /**
   * Receives applied filters from filter component and
   * maps them to respective parameters
   *
   * @param {Object} event - contains applied filters.
   *
   * @return {void}
   */
  applyFilters(event): void {
    if (!event) {
      return;
    }
    this.filterParams['category'] = event.category;
    this.filterParams['status'] = 1;
    if (event.ratings) {
      this.filterParams['ratings'] = event.ratings;
    }
    if (event.lengths) {
      this.filterParams['lengths'] = event.lengths;
    }
    if (event.skills) {
      this.filterParams['skills'] = event.skills;
    }
    if (event.locations) {
      this.filterParams['locations'] = event.locations;
    }
    if (event.type[0]) {
      if (!this.filterParams['type']) {
        this.filterParams['type'] = [];
      }
      this.filterParams['type'].push('mentor');
    }
    if (event.type[1]) {
      if (!this.filterParams['type']) {
        this.filterParams['type'] = [];
      }
      this.filterParams['type'].push('mentee');
    }
    this.filterService.setFilters(event);
    this.getRequests();
  }
}
