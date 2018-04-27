import { Component, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
})
export class DateRangePickerComponent {
  @Input() startDate = moment().subtract(1, 'month').format('DD-MM-YYYY');
  @Input() endDate = moment().format('DD-MM-YYYY');
  @Input() maximumDate: string;
  @Output() onStartDateChange = new EventEmitter();
  @Output() onEndDateChange = new EventEmitter();

  constructor() { }

  /**
   * Emits start date
   *
   * @param {string} date - Date in YYYY-MM-DD
   *
   * @returns {void}
   */
  setStartDate(date: string) {
    this.startDate = date;
    this.onStartDateChange.emit(date);
  }

  /**
   * Emits end date
   *
   * @param {string} date - Date in YYYY-MM-DD
   *
   * @returns {void}
   */
  setEndDate(date) {
    this.endDate = date;
    this.onEndDateChange.emit(date);
  }

}
