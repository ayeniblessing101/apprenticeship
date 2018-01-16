import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-save-filters-modal',
  templateUrl: './save-filters-modal.component.html',
  styleUrls: ['./save-filters-modal.component.scss'],
})
export class SaveFiltersModalComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Output() updateSavedFiltersNames = new EventEmitter<string[]>();

  @Input() filters: any;

  savedFilters: object;
  filterName: string;
  isError: boolean;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.filterName = '';
    this.savedFilters = JSON
      .parse(localStorage.getItem('savedFilters'));
  }

  /**
   * It emits an event which initiates closing of
   * filters save modal
   *
   * @returns {void}
   */
  closeModal(event) {
    const targetId = event.target.id;
    const initiateModalClose = targetId === 'modal-container' || targetId === 'btn-modal-close';
    if (event && initiateModalClose) {
      this.close.emit();
    }
  }

  /**
   * Validates the name of a filter.
   *
   * @param {string} filterName - the name of the filter
   *
   * @returns {string}
   */
  validateFilterName(filterName): any {
    let status = true;
    let message = '';

    if (filterName === '') {
      status = false;
      message = 'Please enter a filter name to save your filter.';
    } else if (filterName.length > 20) {
      status = false;
      message =
        'Please enter a filter name that is not greater than 20 characters.';
    }

    return { status, message };
  }

  /**
   * Save filters to local storage as savedFilters
   *
   * @param {Event} event DOM submit event
   *
   * @returns {void}
   */
  save(event): void {
    event.preventDefault();
    let filterNameExist;
    this.filterName = this.filterName.trim();

    const { status: isValidFilterName, message } =
      this.validateFilterName(this.filterName);

    if (!isValidFilterName) {
      this.isError = true;
      this.alertService.showMessage(
        message,
        () => this.isError = false,
      );
      return;
    }

    if (!this.savedFilters) {
      this.savedFilters = {
        [this.filterName]: this.filters,
      }
    } else {
      if (this.savedFilters[this.filterName]) {
        filterNameExist = true;
        this.isError = true;
        this.alertService
          .confirm(
            `Saving this filter as ${this.filterName} will overwrite ${this.filterName}`,
            this, {
              confirmActionText: 'OVERWRITE',
              abortActionText: 'CANCEL',
              confirmAction: () => {
                this.savedFilters[this.filterName] = this.filters;
                this.persistSavedFilters();
              },
              afterClose: () => this.isError = false,
            });
      } else {
        this.savedFilters[this.filterName] = this.filters;
      }
    }

    if (!filterNameExist) {
      this.persistSavedFilters();
    }
  }

  /**
   * Contains logic for saving filters to local storage
   *
   * @returns {void}
   */
  persistSavedFilters(): void {
    localStorage.
      setItem('savedFilters', JSON.stringify(this.savedFilters));
    const savedFilterNames = Object.keys(this.savedFilters).reverse();
    this.updateSavedFiltersNames
      .emit(savedFilterNames);
    this.isError = false;
    this.close.emit();
  }
}
