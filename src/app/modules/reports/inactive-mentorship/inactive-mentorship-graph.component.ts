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
    if (moment(this.endDate).diff(moment(this.startDate)) > 0 &&
      moment().diff(moment(this.endDate)) >= 0
    ) {
      this.reportsService.getInactiveMentorships(
        this.startDate,
        this.endDate,
      )
        .toPromise()
        .then((inactiveMentorships) => {
          const xAxis = this.formatDates(inactiveMentorships);
          const yAxis = this.getCounts(inactiveMentorships);
          const context = this.elementRef.nativeElement.querySelector('#line-chart');
          this.lineChart = this.drawChart(xAxis, yAxis, context);
        });
    }
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
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fixedStepSize: 1,
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
}
