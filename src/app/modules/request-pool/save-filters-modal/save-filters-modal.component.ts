import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

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
   * @param {void}
   */
  save(event) {
    this.filtersName = this.filtersName.trim();
    if (!this.filtersName) {
      return;
    }

    if (!this.savedFilters) {
      this.savedFilters = {
        [this.filtersName]: this.filters,
      }
    } else {
      this.savedFilters[this.filtersName] = this.filters;
    }

    localStorage.
      setItem('savedFilters', JSON.stringify(this.savedFilters));
    this.updateSavedFiltersNames
      .emit(Object.keys(this.savedFilters).reverse());
  }
}
