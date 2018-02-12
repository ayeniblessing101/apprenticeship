import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { localStorage } from 'app/globals';
import { AlertService } from 'app/services/alert.service';

@Component({
  selector: 'app-save-filters',
  templateUrl: './save-filters.component.html',
  styleUrls: ['./save-filters.component.scss'],
})

export class SaveFiltersComponent implements OnInit {
  @Output() resetFilters = new EventEmitter();
  @Output() openSaveFilterModel = new EventEmitter();
  @Output() applySavedFilter = new EventEmitter();
  @Input() filters: object = {};

  isSaveFiltersModalOpened: boolean;
  savedFiltersNames: string[];
  savedFilters: object;
  filterToDelete: string;

  constructor(private alertService: AlertService) {
    this.deleteSavedFilters = this.deleteSavedFilters.bind(this);
  }

  ngOnInit() {
    this.isSaveFiltersModalOpened = false;
    this.savedFilters = JSON.parse(localStorage.getItem('savedFilters'));
    this.savedFiltersNames = this.savedFilters ? Object.keys(this.savedFilters) : [];
  }

  /**
   * Apply the saved filter from local storage
   * @param {string} filterName - The name of the filter
   *
   * @return {void}
   */
  applyFilter(filterName) {
    this.savedFilters = JSON.parse(localStorage.getItem('savedFilters'));
    this.applySavedFilter.emit(this.savedFilters[filterName]);
  }

  /**
   * Deletes a saved filter
   *
   * @returns {void}
   */
  deleteSavedFilters() {
    const savedFilters = JSON.parse(localStorage.getItem('savedFilters'));
    delete savedFilters[this.filterToDelete];
    localStorage.setItem('savedFilters', JSON.stringify(savedFilters));
    this.savedFiltersNames = Object.keys(savedFilters);
  }

/**
   * It carries out a filter delete action through
   * a modal service which allows your to confirm
   * or abort an action
   *
   * @param {Event} event the name of the filter to delete
   */
  confirmDeleteFilter(event) {
    this.filterToDelete = event.target.id;
    const message = `Are you sure you want to delete the saved filter '${
      this.filterToDelete
    }'?`;
    const alertServiceConfig = {
      abortActionText: 'CLOSE',
      confirmActionText: 'DELETE',
      confirmAction: this.deleteSavedFilters,
      canDisable: true,
    };
    this.alertService.confirm(message, this, alertServiceConfig);
  }

  /**
   * Emits the resetFilters event used to trigger reseting of the filters.
   * Resets the saved filters names.
   *
   * @returns {void}
   */
  clearFilters() {
    this.savedFiltersNames.length = 0;
    this.resetFilters.emit();
  }

  /**
   *  Open save filter modal
   *
   * @returns {void}
   */
  openSaveFiltersModal() {
    this.isSaveFiltersModalOpened = true;
  }

  /**
   *  Close save filter modal
   *
   * @returns {void}
   */
  closeSaveFiltersModal() {
    this.isSaveFiltersModalOpened = false;
  }

  /**
   * Updates the saved filters names
   * @param {Event} event - Names of the saved filters.
   *
   * @return {void}
   */
  updateSavedFiltersNames(event) {
    this.savedFiltersNames.push(event[0]);
  }

}
