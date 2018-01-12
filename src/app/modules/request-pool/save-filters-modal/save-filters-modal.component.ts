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
  filtersName: string;
  isError: boolean;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
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
   * Save filters to local storage as savedFilters
   *
   * @param {Event} event DOM submit event
   *
   * @returns {void}
   */
  save(event): void {
    event.preventDefault();
    let filterNameExist;
    let message;
    if (!this.filtersName || this.filtersName.length > 20) {
      message = 'Please enter a valid name to save your filter'
      this.isError = true;
      this.alertService.showMessage(
        message,
        () => this.isError = false,
      );
      return;
    }

    this.filtersName = this.filtersName.trim();

    if (!this.savedFilters) {
      this.savedFilters = {
        [this.filtersName]: this.filters,
      }
    } else {
        if (this.savedFilters[this.filtersName]) {
          filterNameExist = true;
          message =
          `Saving this filter as ${this.filtersName} will overwrite ${this.filtersName}`;
          this.isError = true;

          this.alertService
            .confirm(message, this, {
              confirmActionText: 'OVERWRITE',
              abortActionText: 'CANCEL',
              confirmAction: () => {
                this.savedFilters[this.filtersName] = this.filters;
                this.persistSavedFilters();
              },
              afterClose: () => this.isError = false,
          });
        } else {
          this.savedFilters[this.filtersName] = this.filters;
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
