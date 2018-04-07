import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { SortingHelper } from '../../../helpers/sorting.helper';

@Component({
  selector: 'app-mentor-records',
  templateUrl: './mentor-records.component.html',
  styleUrls: ['./mentor-records.component.scss'],
})
export class MentorRecordsComponent {
  @Input() mentors = [];

  sortCategoryValues = {
    name: 'asc',
    mentorships_count: 'asc',
    average_rating: 'asc',
    last_active: 'asc',
  };

  activeSortCategory = null;
  rerender: boolean;

  constructor(
    private sortingHelper: SortingHelper,
    private changeDetector: ChangeDetectorRef,
  ) { }

  /**
   * Sorts mentors details based on the table header if the column has values
   *
   * @param {String} headerName - name of the tble column header
   * @param {Boolean} headerIsDataType - whether the header is of type data or not
   *
   * @return {void}
   */
  sortMentorsByHeader(headerName, headerIsDateType) {

    if (!this.checkRequestHeaderHasValue(headerName)) {
      return;
    }

    let sortingOrder = this.sortCategoryValues[headerName];

    if (this.activeSortCategory === headerName) {
      sortingOrder = this.sortCategoryValues[headerName] === 'asc' ? 'desc' : 'asc';
    }

    this.sortingHelper.sortRequestsByHeader(
      this.mentors, headerName, headerIsDateType, sortingOrder,
    );

    this.sortCategoryValues[headerName] = sortingOrder;
    this.activeSortCategory = headerName;
    this.rerender = true;
    this.changeDetector.detectChanges();
    this.rerender = false;
  }

  /** Checks whether the column of a request table header is not null
   *
   * @return {Boolean} - Result of whether the table header has column value or not
   */
  checkRequestHeaderHasValue(headerName) {
    const headerValueIndex = this.mentors.findIndex((detail) => {
      return !!detail[headerName];
    });

    return headerValueIndex !== -1;
  }
}
