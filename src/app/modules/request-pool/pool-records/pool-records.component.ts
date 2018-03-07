import { Component, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { SortingHelper } from '../../../helpers/sorting.helper';


@Component({
  selector: 'app-pool-records',
  templateUrl: './pool-records.component.html',
  styleUrls: ['./pool-records.component.scss'],
})
export class PoolRecordsComponent {
  showRequest = false;
  @Input() requests = [];
  @Output() updateSortingStatus = new EventEmitter<any>();
  selectedRequest: object;
  rerender: boolean;

  sortCategoryValues = {
    title: 'asc',
    duration: 'asc',
    location: 'asc',
    created_at: 'asc',
  };

  activeSortCategory = null;

  constructor(
    private sortingHelper: SortingHelper,
    private changeDetector: ChangeDetectorRef) {}

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
   * @param {String} headerName - Name of the table column header
   * @param {Boolean} headerIsDateType - whether the header is of type date or not
   *
   * @return {void}
   */
  sortPoolRequestsByHeader(headerName, headerIsDateType = false) {
    let sortingOrder = this.sortCategoryValues[headerName];

    if (this.activeSortCategory === headerName) {
      sortingOrder = this.sortCategoryValues[headerName] === 'asc' ? 'desc' : 'asc';
    }

    this.sortingHelper.sortRequestsByHeader(
      this.requests, headerName, headerIsDateType, sortingOrder,
    );

    this.updatePoolRequestsSortingStatus(headerName, headerIsDateType, sortingOrder);
    this.sortCategoryValues[headerName] = sortingOrder;
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
    this.updateSortingStatus.emit({ headerName, headerIsDateType, sortingOrder })
  }
}
