import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { FilterService } from '../../../services/filter.service';
import { PoolFiltersComponent } from 'app/modules/request-pool/pool-filters/pool-filters.component';
import { SortingStatus } from '../../../interfaces/sorting.interface';
import { TableHeaderSortHelper } from '../../../helpers/table-header-sort.helper';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss'],
})
export class PoolComponent implements OnInit {

  @ViewChild(PoolFiltersComponent) poolFilterComponent;
  @Input() showFilters = true;
  @Input() showOpenRequests = true;
  @Input() includeInterestedRequests = false;

  currentPage = 1;
  limit = 20;
  loading: boolean;
  loadingRequests: boolean;
  isSaveFiltersModalOpened: boolean;
  requests = [];
  filterParams: any = {};
  sectionGridWidth = '71%';
  firstPageLoad: boolean;
  noResultMessage: string;
  sortingStatus: SortingStatus = null;

  constructor(private requestService: RequestService,
              private tableHeaderSorterHelper: TableHeaderSortHelper,
              private filterService: FilterService) {
  }

  ngOnInit() {
    this.isSaveFiltersModalOpened = false;
    this.firstPageLoad = true;
    this.filterParams = this.filterService.getFilters();
    this.loadRequests();
    if (!this.showFilters) {
      this.sectionGridWidth = '90%';
    }
    this.requestService.requestPool.subscribe(() => {
      this.loadRequests();
    });
  }

  /**
   * Get request from the Lenken API service
   *
   * @return {void}
   */
  loadRequests(): void {
    this.loadingRequests = true;
    this.currentPage = 1;
    if (this.showOpenRequests) {
      this.filterParams['status'] = 1;
    }

    this.getRequests(this.limit, this.currentPage, this.filterParams)
      .then((response) => {
        this.requests = response.requests;
        this.loadingRequests = false;
        if (this.requests.length === 0 && this.filterParams.category === 'recommended'
          && this.firstPageLoad) {
          this.firstPageLoad = false;
          this.poolFilterComponent.applySelectedFilters({ type: 'category', value: 'all' });
        }
      });
  }

  /**
   * This function makes the decision between which API to call because
   * the request pool can either display all records or pool related records
   * which is based on the user's interest.
   *
   * @param {Number} limit - the number of requests to be gotten
   * @param {Number} page - the page of the requests to be gotten
   * @param {Object} filters - the parameters to apply to API call
   *
   * @return {Promise<any>}
   */
  getRequests(limit, page, filters): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.includeInterestedRequests) {
        this.requestService.getRequests(limit, page, filters)
          .toPromise()
          .then(response => resolve(response))
          .catch(error => reject(error));
      } else {
        this.requestService.getPoolRequests(limit, page, filters)
          .toPromise()
          .then(response => resolve(response))
          .catch(error => reject(error));
      }
    });
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
    this.getRequests(this.limit, this.currentPage, this.filterParams)
      .then((response) => {
        // concatenate new request data with previous data
        this.requests = [
          ...this.requests,
          ...response.requests,
        ];

        if (this.sortingStatus) {
          const { headerName, headerIsDateType, sortingOrder } = this.sortingStatus;
          this.tableHeaderSorterHelper.sortRecordsUsingHeaders(
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

    this.noResultMessage = `Your filter criteria didn't return any result. Try something different`;

    this.filterParams = {};
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
    this.loadRequests();
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
