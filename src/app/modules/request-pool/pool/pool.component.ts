import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { FilterService } from '../../../services/filter.service';
import { UserService } from '../../../services/user.service';

import { PoolFiltersComponent } from 'app/modules/request-pool/pool-filters/pool-filters.component';
import { SortingStatus } from '../../../interfaces/sorting.interface';
import { SortingHelper } from '../../../helpers/sorting.helper';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss'],
})
export class PoolComponent implements OnInit {

  @ViewChild(PoolFiltersComponent) poolFilterComponent;
  @Input() showFilters = true;
  @Input() showOpenRequests = true;
  currentPage = 1;
  limit = 20;
  loading: boolean;
  loadingRequests: boolean;
  isSaveFiltersModalOpened: boolean;
  requests = [];
  filterParams: any = {};
  sectionGridWidth = '71%';
  firstPageLoad: boolean;
  sortingStatus: SortingStatus = null;

  constructor(
    private requestService: RequestService,
    private sortingHelper: SortingHelper,
    private filterService: FilterService,
  ) {
  }

  ngOnInit() {
    this.isSaveFiltersModalOpened = false;
    this.firstPageLoad = true;
    this.filterParams = this.filterService.getFilters();
    this.getRequests();
    if (!this.showFilters) {
      this.sectionGridWidth = '90%';
    }
    this.requestService.requestPool.subscribe(() => {
      this.getRequests();
    });
  }

  /**
   * Get create-request from the Lenken API service
   *
   * @return {void}
   */
  getRequests(): void {
    this.loadingRequests = true;
    this.currentPage = 1;
    if (this.showOpenRequests) {
      this.filterParams['status'] = 1;
    }
    this.requestService.getRequests(this.limit, this.currentPage, this.filterParams)
      .toPromise()
      .then((response) => {
        this.requests = response.requests;
        this.loadingRequests = false;
        if (this.requests.length === 0 && this.filterParams.category === 'recommended'
          && this.firstPageLoad) {
          this.firstPageLoad = false;
          this.poolFilterComponent.applySelectedFilters({ type: 'category', value: 'all' });
        }
      },
    );
  }

  /**
   * Fetches requests on page scroll and also sorts accordingly should a user
   * already started sorting requests before scrolling.
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
          ...response.requests,
        ];

        if (this.sortingStatus) {
          const { headerName, headerIsDateType, sortingOrder } = this.sortingStatus;
          this.sortingHelper.sortRequestsByHeader(
            this.requests, headerName, headerIsDateType, sortingOrder,
          );
        }

        this.loadingRequests = false;
      });
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

    this.filterParams = {}
    this.filterParams['category'] = event.category;
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
    if (event.status) {
      this.filterParams['status'] = event.status;
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
    if (event.startDate) {
      this.filterParams['startDate'] = event.startDate;
    }
    if (event.endDate) {
      this.filterParams['endDate'] = event.endDate;
    }
    this.filterService.setFilters(event);
    this.getRequests();
  }

  /**
   * Updates the pool requests sorting status
   * @param event - the event object containing the sorting status
   */
  updatePoolRequestsSortingStatus(event) {
    this.sortingStatus = event;
  }

  /** Filter the passed in evented request
   * from the request pool
   *
   * @param {object} event - contains dispatched request.
   *
   * @return {void}
   */
  filterCurrentRequestsPool(event) {
    this.requests = this.requests.filter((request) => {
      return request.id !== event.id;
    });
  }
}
