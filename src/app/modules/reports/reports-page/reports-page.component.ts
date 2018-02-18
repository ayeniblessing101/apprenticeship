import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
})
export class ReportsPageComponent implements OnInit {
  startDate;
  endDate;

  constructor() { }

  ngOnInit() {
    this.startDate = moment().subtract(1, 'month').format('YYYY-MM-DD');
    this.endDate = moment().format('YYYY-MM-DD')
  }

  /**
   * Set start date
   *
   * @param {string} date - Start date
   *
   * @returns {void}
   */
  private setStartDate(date: string) {
    this.startDate = this.formatDate(date);
  }

  /**
   * Set end date
   *
   * @param {string} date - End date
   *
   * @returns {void}
   */
  private setEndDate(date: string) {
    this.endDate = this.formatDate(date);
  }

  /**
   * Format date to YYYY-MM-DD
   *
   * @param {string} date - Date in DD-MM-YYYY format
   *
   * @returns {string} - Date in YYYY-MM-DD
   */
  private formatDate(date: string) {
    return date.split('-').reverse().join('-');
  }
}
