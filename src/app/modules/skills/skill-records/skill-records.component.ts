import { Component, Input, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import { SortingHelper } from '../../../helpers/sorting.helper';

@Component({
  selector: 'app-skill-records',
  templateUrl: './skill-records.component.html',
  styleUrls: ['./skill-records.component.scss'],
})

export class SkillRecordsComponent {
  @Input() skills: any[];
  rerender: boolean;

  sortCategoryValues = {
    name: 'asc',
    active: 'asc',
    number_of_requests: 'asc',
    last_requested: 'asc',
  }

  activeSortCategory = null;

  constructor(
     private sortingHelper: SortingHelper,
     private changeDetector: ChangeDetectorRef,
  ) {

  }


  /**
  * It sorts skills base on the skills headers.
  *
  * @param {string} headerName The name of the skill header to be sorted by skills.
  * @param {boolean} headerIsDateType Determines waether to sort using date.
  *
  * @returns {void}
  */
  sortSkills(headerName, headerIsDateType = false) {
    let sortingOrder = this.sortCategoryValues[headerName];

    if (this.activeSortCategory === headerName) {
      sortingOrder = this.sortCategoryValues[headerName] === 'asc' ? 'desc' : 'asc';
    }

    this.sortingHelper.sortRequestsByHeader(
      this.skills, headerName, headerIsDateType, sortingOrder,
    );

    this.sortCategoryValues[headerName] = sortingOrder;
    this.activeSortCategory = headerName;
    this.rerender = true;
    this.changeDetector.detectChanges();
    this.rerender = false;
  }
}
