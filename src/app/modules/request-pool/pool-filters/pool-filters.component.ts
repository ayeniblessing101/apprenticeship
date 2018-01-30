import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterService } from 'app/services/filter.service';
import { localStorage } from 'app/globals';
import { AlertService } from 'app/services/alert.service';

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

  defaultFilters: object;
  filterToDelete: string;

  appliedFilters: any;
  skills: any = [];
  ratings: any = [];
  locations: any = [];
  lengths: any = [];

  selectedFilters = {};
  filters: any;

  constructor(private filterService: FilterService,
              private alertService: AlertService) {

    this.defaultFilters = {
      status: REQUEST_STATUS.OPEN,
      category: 'recommended',
      type: [],
      ratings: [],
      locations: [],
      skills: [],
      lengths: [],
    };

    this.deleteSavedFilters = this.deleteSavedFilters.bind(this);
  }

  ngOnInit() {
    this.initializeFilters();
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
   * It carries out a filter delete action through
   * a modal service which allows your to confirm
   * or abort an action
   *
   * @param {Event} event the name of the filter to delete
   */
  confirmFiltersDelete(event) {
    this.filterToDelete = event.target.id;
    const message =
      `Are you sure you want to delete the saved filter '${this.filterToDelete}'?`
    const alertServiceConfig = {
      abortActionText: 'CLOSE',
      confirmActionText: 'DELETE',
      confirmAction: this.deleteSavedFilters,
      canDisable: true,
    }
    this.alertService.confirm(message, this, alertServiceConfig);
  }

  /**
   * Deletes a saved filter
   *
   * @returns {void}
   */
  deleteSavedFilters() {
    const savedFilters = JSON
      .parse(localStorage.getItem('savedFilters'));
    delete savedFilters[this.filterToDelete];
    localStorage
      .setItem('savedFilters', JSON.stringify(savedFilters));
    this.savedFiltersNames = Object.keys(savedFilters)
  }

  /**
   *  IteEmits an event initiates opening
   * of request filter modal
   *
   * @returns {void}
   */
  openFiltersSaveModal() {
    this.openSaveFiltersModal.emit();
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
    this.getSkillsWithRequests();

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
}
