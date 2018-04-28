import { Component, Input, ElementRef, OnChanges } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { ReportsService } from '../../../services/reports.service';

@Component({
  selector: 'app-inactive-mentorship-graph',
  templateUrl: './inactive-mentorship-graph.component.html',
  styleUrls: ['./inactive-mentorship-graph.component.scss'],
})
export class InactiveMentorshipGraphComponent implements OnChanges {
  @Input() startDate: string;
  @Input() endDate: string;
  lineChart: any;

  constructor(
    private reportsService: ReportsService,
    private elementRef: ElementRef,
  ) { }

  ngOnChanges() {
    this.reportsService.getInactiveMentorships(
      this.formatDate(this.startDate),
      this.formatDate(this.endDate),
    )
      .toPromise()
      .then((inactiveMentorships) => {
        const xAxis = this.formatDates(inactiveMentorships);
        const yAxis = this.getCounts(inactiveMentorships);
        const lineChartElement = this.elementRef.nativeElement.querySelector('#line-chart');
        this.lineChart = this.drawChart(xAxis, yAxis, lineChartElement);
      });
  }

  /**
   * Draw inactive mentorship chart
   *
   * @param {array} xAxis - Inactive mentorship dates
   * @param {array} yAxis - Inactive mentorship counts
   *
   * @returns {Object} - chart canvas properties
   */
  private drawChart(xAxis: string[], yAxis: number[], context) {
    return new Chart(context, {
      type: 'line',
      options: {
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRation: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fixedStepSize: 5,
            },
          }],
        },
      },
      data: {
        labels: xAxis,
        datasets: [{
          data: yAxis,
          fill: false,
          borderColor: [
            '#3359db',
          ],
          borderWidth: 1,
          lineTension: 0,
          pointRadius: 4,
          pointBackgroundColor: '#fff',
        }],
      },
    })
  }

  /**
   * Format inactive mentorship dates
   *
   * @param {array} inactiveMentorships - Inactive mentorships
   *
   * @returns {void}
   */
  private formatDates(inactiveMentorships: any[]) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return inactiveMentorships.map(inactiveMentorship =>
      `${months[moment(inactiveMentorship.startDate).month()]} ${moment(inactiveMentorship.startDate).date()}`,
    );
  }

  /**
   * Get inactive mentorship counts
   *
   * @param {array} inactiveMentorships - Inactive mentorships
   *
   * @returns {array} - Inactive mentorship counts
   */
  private getCounts(inactiveMentorships: any[]) {
    return inactiveMentorships.map(inactiveMentorship =>
      inactiveMentorship.count,
    );
  }

  /**
   * Format date to 'YYYY-MM-DD' Eg. 2018-10-10
   *
   * @param {string} date - Selected date in DD-MM-YYYY format
   *
   * @returns {string} - date in YYYY-MM-DD
   */
  formatDate(date) {
    return moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
  }
}
