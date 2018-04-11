import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { TableHeaderSortHelper } from '../../../helpers/table-header-sort.helper';

@Component({
  selector: 'app-mentor-records',
  templateUrl: './mentor-records.component.html',
  styleUrls: ['./mentor-records.component.scss'],
})
export class MentorRecordsComponent {
  @Input() mentors = [];

  activeSortCategory = null;
  rerender: boolean;
  sortCategoryValues = {
    name: 'asc',
    mentorships_count: 'asc',
    average_rating: 'asc',
    last_active: 'asc',
  };

  constructor(
    private tableHeaderSorterHelper: TableHeaderSortHelper,
    private changeDetector: ChangeDetectorRef,
  ) { }

  /**
   * Sorts array of mentors based on the table header
   *
   * @param {string} headerName - Name of the table column header
   * @param {boolean} headerIsDateType - whether the header is of type date or not
   *
   * @return {void}
   */
  sortMentorsByHeader(headerName,  headerIsDateType = false) {
    this.tableHeaderSorterHelper.sortTableWithHeader(
      headerName,
      headerIsDateType,
      this.mentors,
      this.activeSortCategory,
      this.sortCategoryValues,
    );

    this.activeSortCategory = headerName;
    this.rerender = true;
    this.changeDetector.detectChanges();
    this.rerender = false;
  }
}
