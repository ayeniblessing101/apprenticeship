import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SkillService } from '../../../services/skill.service';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
})
export class ReportsPageComponent implements OnInit {
  startDate;
  endDate;
  loading: boolean;
  skillStatusCountReport: any[];
  selectedLocation: string;
  location: any[];

  constructor() {
    this.location = ['All', 'Lagos', 'Nairobi'];
    this.selectedLocation = 'All';
  }

  ngOnInit() {
    this.startDate = moment().subtract(1, 'month').format('YYYY-MM-DD');
    this.endDate = moment().format('YYYY-MM-DD');
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
