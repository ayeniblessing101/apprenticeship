import { Component, EventEmitter, Input, OnInit, Output, ViewChildren, QueryList } from '@angular/core';
import { FilterService } from 'app/services/filter.service';
import { localStorage } from 'app/globals';
import { AlertService } from 'app/services/alert.service';
import { FilterDropdownComponent } from 'app/modules/request-pool/filter-dropdown/filter-dropdown.component';
import { RequestTypes } from '../../../enums/request-types.enum';

enum REQUEST_STATUS {
  OPEN = 1,
  MATCHED = 2,
  COMPLETED = 3,
  CANCELLED = 4,
}

@Component({
  selector: 'app-pool-filters',
  templateUrl: './pool-filters.component.html',
  styleUrls: ['./pool-filters.component.scss'],
})

export class PoolFiltersComponent implements OnInit {
  @Output() applyFilters = new EventEmitter<any>();
  @Output() openSaveFiltersModal = new EventEmitter();
  @Input() savedFiltersNames: string[];
  @ViewChildren(FilterDropdownComponent) filterDropdowns: QueryList<FilterDropdownComponent>;

  defaultFilters: object;
  filterToDelete: string;

  appliedFilters: any;
  skills: any = [];
  ratings: any = [];
  locations: any = [];
  lengths: any = [];
  type: any = [];
  isSkillsFetched = false;
  isMentorChecked = false;
  isMenteeChecked = false;
  selectedFilters = {};
  requestTypes = RequestTypes;
  filters: any;

  constructor(private filterService: FilterService,
              private alertService: AlertService) {

    this.defaultFilters = {
      status: REQUEST_STATUS.OPEN,
      category: 'myRequests',
      type: [],
      ratings: [],
      locations: [],
      skills: [],
      lengths: [],
    };
  }

  ngOnInit() {
    this.initializeFilters();
    this.isSkillsFetched = true;
  }

  /**
   * Receives the selected filters from the requests radio buttons and the
   * filter-dropdown component and emits them to the pool component to be applied.
   *
   * @param event
   *
   * @return {void}
   */
  applySelectedFilters(event) {
    this.selectedFilters[event.type] = event.value;
    this.applyFilters.emit(this.selectedFilters);
  }

  /**
   * Receives the selected filters from the requests type check boxes
   * Call applySelected function to handle emits to the pool component to be applied.
   *
   * @param event
   *
   * @return {object}
   */
  toggleRequestTypes(event) {
    const selectedValue = parseInt(event.value, 10);

    if (selectedValue === this.requestTypes.MENTOR_REQUEST) {
      this.isMentorChecked = !this.isMentorChecked;
      this.isMentorChecked ? this.type.push(event.value) :
        this.type.splice(this.type.indexOf(event.value), 1);
    } else {
      this.isMenteeChecked = !this.isMenteeChecked;
      this.isMenteeChecked ? this.type.push(event.value) :
        this.type.splice(this.type.indexOf(event.value), 1);
    }

    return this.applySelectedFilters({
      type: event.type, value: this.type,
    });
  }

  /**
   * Get a list of skills with create-request
   *
   * @return {void}
   */
  getSkillsWithRequests(): void {
    this.filterService.getSkillsWithRequests()
      .toPromise()
      .then((skills) => {
        this.skills = skills;
      });
  }

  /**
   * Initializes appliedFilters and sets the display values for filter items
   *
   * @return {void}
   */
  initializeFilters(): void {
    if (!this.isSkillsFetched) {
      this.getSkillsWithRequests();
    }

    if (this.isSkillsFetched) {
      this.skills.forEach((value) => {
        delete value.checked;
      });

      this.ratings = [];
      this.lengths = [];
      this.selectedFilters = {};
    }

    this.locations = [
      { name: 'Kampala' },
      { name: 'Lagos' },
      { name: 'Nairobi' },
    ];

    this.ratings.push({ label: '1 Star', value: 1 });
    [2, 3, 4, 5].forEach((rating) => {
      this.ratings.push({ label: `${rating} Stars`, value: rating })
    });

    this.lengths.push({ label: '1 Month', value: 1 });
    [2, 3, 4, 5].forEach((length) => {
      this.lengths.push({ label: `${length} Months`, value: length })
    });

    const filters = this.filterService.getFilters();
    this.appliedFilters = filters;
    filters['status'] = REQUEST_STATUS.OPEN;
    this.selectedFilters = { ...filters, ...this.selectedFilters };
  }

  /**
   * This resets request filters form to its default
   *
   * @returns {void}
   */
  resetFilters() {
    localStorage.removeItem('savedFilters');
    this.initializeFilters();
    this.applyFilters.emit(this.defaultFilters);

    this.filterDropdowns.forEach((dropDown) => {
      dropDown.clearCheckedList();
    });
  }

  /**
   * Apply the saved filter upon selection.
   * @param {Event} event - The filter to apply.
   *
   * @return {void}
   */
  applySavedFilter(event) {
    this.selectedFilters = event;
    this.applyFilters.emit(this.selectedFilters);

    this.filterDropdowns.forEach((dropDown) => {
      dropDown.checkFilters(this.selectedFilters);
    });
  }
}
