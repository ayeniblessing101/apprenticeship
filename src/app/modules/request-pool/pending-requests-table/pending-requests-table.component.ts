import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { TableHeaderSortHelper } from '../../../helpers/table-header-sort.helper';

@Component({
  selector: 'app-pending-requests-table',
  templateUrl: './pending-requests-table.component.html',
  styleUrls: ['./pending-requests-table.component.scss'],
})
export class PendingRequestsTableComponent {

  @Input() requests;
  @Input() loading: boolean;
  @Input() title: string;
  @Output() reload: EventEmitter<boolean> = new EventEmitter();
  @Output() request = new EventEmitter<number>();
  openModal: boolean;
  pendingRequest: any[];
  rerender: boolean;
  activeSortCategory = null;
  sortCategoryValues = {
    title: 'asc',
    created_by_name: 'asc',
    request_skills: 'asc',
    duration: 'asc',
    created_at: 'asc',
    location: 'asc',
    interested: 'asc',
    awaited_user: 'asc',
  }

  constructor(
    private tableHeaderSorterHelper: TableHeaderSortHelper,
    private changeDetector: ChangeDetectorRef,
  ) { }


  /**
   * Open pending modal to display single request info and emit request to pending
   * modal such that it can be deleted from pending pool
   *
   * @param {Object} request - single request object
   */
  openPendingModal(request) {
    this.pendingRequest = request;
    this.openModal = true;
    this.request.emit(request);
  }

  /**
   * Closes pending modal
   */
  closePendingModal() {
    this.openModal = false;
  }

  /**
   * Sorts pending requests based on the table header
   *
   * @param {string} headerName - Name of the table column header
   * @param {boolean} headerIsDateType - whether the header is of type date or not
   *
   * @return {void}
   */
  sortPendingRequestsByHeader(headerName,  headerIsDateType = false) {
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
}
