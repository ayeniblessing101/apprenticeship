import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
})
export class ReportsPageComponent {
  startDate = moment().subtract(1, 'month').format('DD-MM-YYYY');
  endDate = moment().format('DD-MM-YYYY');
  maximumDate = moment().format('DD-MM-YYYY');
  loading: boolean;
  skillStatusCountReport: any[];
  selectedLocation: string;
  location: any[string];

  constructor() {
    this.location = ['All', 'Lagos', 'Nairobi'];
    this.selectedLocation = 'All';
  }


  /**
   * Sets the location of the requests
   *
   * @param {Event} value - change event
   *
   * @return {Void}
   */
  setLocation(value): void {
    this.selectedLocation = value;
  }

  /**
   * Sets the start date to be used by the charts
   *
   * @param {string} date - start date from the date range picker
   *
   * @return {void}
   */
  setStartDate(date: string): void {
    this.startDate = date;
  }

  /**
   * Sets the end date to be used in to be used in the charts
   *
   * @param {string} date - end date from the date range picker
   *
   * @return {void}
   */
  setEndDate(date: string): void {
    this.endDate = date;
  }
}
