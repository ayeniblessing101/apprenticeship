import { Component, Input, ElementRef, OnChanges } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { BarChart } from '../../../interfaces/bar-chart.interface';
import { SkillService } from '../../../services/skill.service';

@Component({
  selector: 'app-request-count-bar-chart',
  templateUrl: './request-count-bar-chart.component.html',
  styleUrls: ['./request-count-bar-chart.component.scss'],
})
export class RequestCountBarChartComponent implements OnChanges {
  @Input() startDate;
  @Input() endDate;
  @Input() location;

  error: string;
  barChart: BarChart;
  loading: boolean;
  displayChart: string;
  data: any;
  colors: any;

  xAxis = [];
  yAxis = [];

  constructor(private elementRef: ElementRef, private skillService: SkillService) {}

  ngOnChanges() {
    this.getReports(this.formatDate(this.startDate), this.formatDate(this.endDate), this.location);
  }

  /**
   * Gets reports that contains counts of all skills
   * requested based on query parameters
   *
   * @param {String} startDate - The date from calendar to begin query from
   * @param {String} endDate - The date from calendar to end query
   * @param {String} location - request location
   *
   * @return {Void}
   */
  getReports(start_date: string, end_date: string, location: string): void {
    const reportQueryParameters = {
      start_date,
      end_date,
      location: location === 'All' ? '' : location,
    };

    this.displayChart = 'none';
    this.loading = true;
    this.skillService.getSkillStatusCount(reportQueryParameters)
      .subscribe((report) => {
        if (report.length === 0) {
          this.error = 'No requests made within this period.';
          this.loading = false;
        } else {
          this.displayChart = 'block';
          this.loading = false;
          this.populateYAxes(this.calculateSkillStatusPercentage(report), this.getAllStatus(report));
          this.populateXAxes(this.calculateSkillStatusPercentage(report));
          this.drawBarChart();
        }
      });
  }

  /**
   * Populates the Y axis of the graphs
   *
   * @param {Array} skills - top ten most requested skills
   *
   * @return {Void}
   */
  populateYAxes(skills: any[], statuses: any[]) {
    const backgroundColor = {
      open: '#d9c822',
      matched: '#3359db',
      completed: '#25880c',
      cancelled: '#bf0000',
    };
    this.yAxis = [];
    statuses.forEach((status) => {
      const dataSet = {};
      dataSet['label'] = status;
      dataSet['data'] = [];
      dataSet['backgroundColor'] = backgroundColor[status];
      skills.forEach((skill) => {
        if (status in skill.percentage) {
          dataSet['data'].push(skill.percentage[status]);
        } else {
          dataSet['data'].push(0);
        }
      });
      this.yAxis.push(dataSet);
    });
  }

  /**
   * Populates the X axis of the graphs
   *
   * @param {Array} skills - top ten most requested skills
   * @return {Void}
   */
  populateXAxes(skills: any[]) {
    this.xAxis = [];
    skills.forEach((skill) => {
      this.xAxis.push(skill.name);
    });
  }

  /**
   * Draw bar chart for frequency of skills within a particular period
   *
   * @returns {void}
   */
  drawBarChart() {
    if (this.barChart != null) {
      this.barChart.destroy();
    }
    const context = this.elementRef.nativeElement.querySelector('#bar-chart');
    this.barChart = new Chart(context, {
      type: 'bar',
      data: {
        labels: this.xAxis,
        datasets: this.yAxis,
      },
      options: {
        maintainAspectRatio: true,
        responsive: false,
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              callback: (value, index, values) => {
                return value + '%';
              },
            },
          }],
          xAxes: [{
            type: 'category',
            labels: this.xAxis,
            stacked: false,
            beginAtZero: true,
            ticks: {
              min: 0,
              autoSkip: false,
            },
            barPercentage: 1,
            categoryPercentage: 0.8,
            gridLines: {
              offsetGridLines: true,
            },
          }],
        },
      },
    });
  }

  /**
   * Calculates the percentage occurrence of each status within
   * a skill based on the overall occurrence of that skill within a period
   * and location
   *
   * @param {Array} skills - total occurrence of each skill
   *
   * @return {Array} - percentage occurrence
   */
  calculateSkillStatusPercentage(skills: any[]): any[] {
    const sortedSkills = this.getAllSkillsSorted(skills);
    sortedSkills.forEach((skill) => {
      const skillCount = skill.count;
      skill.percentage = {};

      Object.keys(skillCount).forEach((status) => {
        const statusPercentage = skillCount[status] / skill.totalCount * 100;
        skill.percentage[status] = Math.round(statusPercentage);
      });
    });

    return sortedSkills;
  }

  /**
   * Get all skills and sort them based on total number of requests made
   *
   * @param {Array} skills - total occurrence of each skill
   *
   * @return {Array} - percentage occurrence
   */
  getAllSkillsSorted(skills: any[]): any[] {
    const sum = skills.map(({ count, name }) => {
      let totalCount = 0;
      for (const status in count) {
        if (count.hasOwnProperty(status)) {
          totalCount += count[status];
        }
      }
      return { totalCount, count, name };
    });

    return sum.sort((currentSkill, nextSkill) =>
      nextSkill.totalCount - currentSkill.totalCount);
  }

  /**
   * Gets all requests status from the response object
   *
   * @param {Array} skills - total occurrence of each skill
   *
   * @return {Array} - all status
   */
  getAllStatus(skills: any[]): any[] {
    const allStatuses = [];
    skills.forEach(({ count }) => {
      for (const status in count) {
        if (!allStatuses.includes(status)) {
          allStatuses.push(status);
        }
      }
    });
    return allStatuses;
  }

  /**
   * Format date to 'YYYY-MM-DD' Eg. 2018-04-16
   *
   * @param {Date} date - Selected date
   *
   * @returns {Date}
   */
  formatDate(date) {
    return moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
  }
}
