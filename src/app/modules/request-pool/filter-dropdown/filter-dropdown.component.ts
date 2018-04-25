import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss'],
})
export class FilterDropdownComponent implements OnInit {
  @Input() list: any[];
  @Input() label: string;
  @Input() placeholder: string;
  @Input() filterCategory: string;
  @Input() disabled: boolean;

  @Output() changes = new EventEmitter();

  checkedList: any[];
  checkedNumbers = [];
  showDropDown: boolean;
  filterDetails = {};

  ngOnInit() {
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

  /**
   * Clears the checked list
   *
   * @return void
   */
  clearCheckedList() {
    this.checkedList = [];
  }

  /**
   * Make filters checked
   * @param {object} filter - Filters to check.
   *
   * @return {void}
   */
  checkFilters(filters) {
    const checkList = [];
    this.list.forEach((element) => {
      if (filters[this.filterCategory].includes(element.name)) {
        element.checked = true;
        checkList.push(element.name);
      } else if (filters[this.filterCategory].includes(element.value)) {
        element.checked = true;
        checkList.push(element.label);
      } else if (filters[this.filterCategory].includes(element.id)) {
        element.checked = true;
        checkList.push(element.name);
      } else {
        element.checked = false;
      }
    });
    this.checkedList = checkList;
  }
}
