import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss'],
})
export class FilterDropdownComponent {
  @Input() list: any[];
  @Input() placeholder: string;
  @Input() filterCategory: string;
  @Input() disabled: boolean;

  @Output() changes = new EventEmitter();

  checkedList: any[] = [];
  checkedNumbers = [];
  showDropDown: boolean;
  filterDetails = {};

  constructor() {
    this.checkedList = [];
    this.filterDetails[this.filterCategory] = this.list;
  }

  /**
   * Gets the value of the selected filter and constructs a filter
   * object depending on the status of the checkbox.
   *
   * @param {Object} filter - The object in the current iteration of the loop
   * @param {Boolean} status - The status of the checkbox
   * @param {String} value - The label or name attribute of the object in the
   * current iteration
   *
   * @return {void}
   */
  applyFilters(filter: any, status: Boolean, value: String) {
    if (status) {
      if (filter.name) {
        if (filter.id) {
          this.checkedNumbers.push(filter.id);
        }
        this.checkedList.push(value);
      } if (filter.label) {
        this.checkedList.push(value);
        this.checkedNumbers.push(filter.value);
      }
    } else {
      const index = this.checkedList.indexOf(value);
      this.checkedList.splice(index, 1);
      if (filter.label || filter.id) {
        this.checkedNumbers.splice(index, 1);
      }
    }

    const filtersToEmit = {};
    filtersToEmit['type'] = this.filterCategory;
    if (filter.label || filter.id) {
      filtersToEmit['value'] = this.checkedNumbers;
    } else if (filter.name && !filter.id) {
      filtersToEmit['value'] = this.checkedList;
    }
    this.changes.emit(filtersToEmit);
  }
}
