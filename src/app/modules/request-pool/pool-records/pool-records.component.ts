import { Component, Input, EventEmitter, Output, ChangeDetectorRef, OnInit } from '@angular/core';
import { TableHeaderSortHelper } from '../../../helpers/table-header-sort.helper';
import { FilterService } from '../../../services/filter.service';
import { RequestService } from '../../../services/request.service';
import { InfiniteScrollDirective } from '../../../directives/infinite-scroll.directive';

@Component({
  selector: 'app-pool-records',
  templateUrl: './pool-records.component.html',
  styleUrls: ['./pool-records.component.scss'],
})
export class PoolRecordsComponent implements OnInit {
  @Input() requests = [];
  @Input() loadingRequests: boolean;
  @Input() noResultMessage: string;

  @Output() updateSortingStatus = new EventEmitter<any>();
  @Output() updateRequests = new EventEmitter<any>();
  @Output() filterRequestsPool: EventEmitter<object> = new EventEmitter();

  showRequest = false;
  selectedRequest: object;
  rerender: boolean;
  scrollCallback: any;
  filterParams: any = {}
  currentPage = 1;
  limit = 20;
  loading = false;


  sortCategoryValues = {
    title: 'asc',
    duration: 'asc',
    location: 'asc',
    created_at: 'asc',
  };
  activeSortCategory = null;

  constructor(
    private tableHeaderSorterHelper: TableHeaderSortHelper,
    private changeDetector: ChangeDetectorRef,
    private filterService: FilterService,
    private requestService: RequestService) {
    this.scrollCallback = this.getRequests.bind(this);
  }

  ngOnInit() {
    this.filterParams = this.filterService.getFilters();
  }

/**
 * This function makes a call to the API to get more requests
 * when a user scrolls down to 70% of the current requests.
 *
 * @param {Number} limit - the number of requests to be gotten
 * @param {Number} page - the page of the requests to be gotten
 * @param {Object} filters - the parameters to apply to API call
 *
 * @return {Observable<any>}
 */
  getRequests() {
    this.loading = true;
    return this.requestService.getRequests(
      this.limit, this.currentPage, this.filterParams,
    )
    .do(this.emitNewRequestsAndUpdateCurrentPage);
  }
  private emitNewRequestsAndUpdateCurrentPage = (requests) => {
    this.currentPage += 1;
    this.updateRequests.emit(requests);
    this.loading = false;
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
   * Sorts pool requests based on the table header
   *
   * @param {string} headerName - Name of the table column header
   * @param {boolean} headerIsDateType - whether the header is of type date or not
   *
   * @return {void}
   */
  sortPoolRequestsByHeader(headerName, headerIsDateType = false) {
    this.tableHeaderSorterHelper.sortTableWithHeader(
      headerName,
      headerIsDateType,
      this.requests,
      this.activeSortCategory,
      this.sortCategoryValues,
    );

    this.activeSortCategory = headerName;
    this.rerender = true;
    this.changeDetector.detectChanges();
    this.rerender = false;
  }

  /**
   * Emits event that updates the sorting status in the pool requests
   * @param headerName - name of the request header
   * @param headerIsDateType - whether the header is of type date or not
   * @param sortingOrder - The order in which the requests is sorted
   */
  updatePoolRequestsSortingStatus(headerName, headerIsDateType, sortingOrder) {
    this.updateSortingStatus.emit({ headerName, headerIsDateType, sortingOrder });
  }

  /** Triggers the emitter event used by the
   * requests pool component in filtering
   * its requests pool
   *
   * @return {void}
   */
  initiateRequestsPoolFilter() {
    this.filterRequestsPool.emit(this.selectedRequest);
  }


  /** Checks whether the column of a request table header is not null
   *
   * @return {Boolean} - Result of whether the table header has column value or not
   */
  checkRequestHeaderHasValue(headerName) {
    const headerValueIndex = this.requests.findIndex((request) => {
      return !!request[headerName];
    });

    return headerValueIndex !== -1;
  }
}
