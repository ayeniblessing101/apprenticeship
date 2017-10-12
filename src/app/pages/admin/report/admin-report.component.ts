import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { ChartModule } from 'angular2-chartjs';

@Component({
  selector: 'app-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss'],
})
export class AdminReportComponent implements OnInit {
  mode = 'determinate';
  periods: {};
  locations: {};
  skills: any[];
  skillsPercentage: any[];
  allStatuses: any[];
  totalRequests: number;
  totalRequestsMatched: number;
  sessionsCompleted: number;
  averageTimeToMatch: string;
  selectedPeriod: string;
  selectedLocation: string;
  include: any[];
  loading: boolean;
  lineDelimiter: string;

  constructor(
    private requestService: RequestService,
  ) {
    this.skills = [];
    this.skillsPercentage = [];
    this.allStatuses = [];
    this.totalRequests = 0;
    this.totalRequestsMatched = 0;
    this.sessionsCompleted = 0;
    this.averageTimeToMatch = '0';
    this.locations = {
      All: '',
      Lagos: 'Lagos',
      Nairobi: 'Nairobi',
    };
    this.periods = {
      'All time': '',
      'Last 1 week': '1',
      'Last 2 weeks': '2',
      'Last 3 weeks': '3',
      'Last month': '4',
    };
    this.selectedPeriod = '';
    this.selectedLocation = '';
    this.include = [
      'totalRequests',
      'totalRequestsMatched',
      'sessionsCompleted',
      'averageTimeToMatch',
    ];
    this.loading = false;
    this.lineDelimiter = '\r\n';
  }
  ngOnInit() {
    this.getReports(this.selectedPeriod, this.selectedLocation, this.include.join());
  }

  /**
   * returns options for dropdown
   *
   * @param {String} content
   * @return {Array}
   */
  getDropdownOptions(content: string) {
    return Object.keys(this[content]);
  }

  /**
   * Gets all reports from request service
   *
   * @param {String} period
   * @param {String} location
   * @param {String} include
   * @return {Void}
   */
  getReports(period: string, location: string, include: string): void {
    const options = {
      period,
      location,
      include,
    };

    this.loading = true;

    this.requestService.getReports(options)
      .subscribe((report) => {
        this.loading = false;
        this.totalRequests = report.totalRequests;
        this.totalRequestsMatched = report.totalRequestsMatched;
        this.sessionsCompleted = report.sessionsCompleted;
        this.averageTimeToMatch = report.averageTimeToMatch;
        this.allStatuses = this.getStatus(report.skillsCount);
        this.skillsPercentage = this.calculatePercentage(report.skillsCount);
      });
  }

  /**
   * Fetches new report when location or period changes
   *
   * @param {Event} event - change event
   * @return {Void}
   */
  reloadReport(event): void {
    this.skills = [];
    if (this.locations.hasOwnProperty(event.value)) {
      this.selectedLocation = this.locations[event.value];
    } else {
      this.selectedPeriod = this.periods[event.value];
    }
    this.getReports(this.selectedPeriod, this.selectedLocation, this.include.join());
  }

    /**
   * Calculates the skill percentage occurrence
   *
   * @param {Array} skills - total occurrence of each skill
   * @return {Array} - percentage occurrence
   */
  calculatePercentage(skills: any[]): any[] {
    const sortedSkills = this.getTopSkills(skills);
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
   * Sorts skills to get top ten skills
   *
   * @param {Array} skills - total occurrence of each skill
   * @return {Array} - percentage occurrence
   */
  getTopSkills(skills: any[], limit: number = 10): any[] {
    const sum = skills.map(({ count, name }) => {
      let totalCount = 0;
      for (const status in count) {
        if (count.hasOwnProperty(status)) {
          totalCount += count[status];
        }
      }
      return { totalCount, count, name };
    });

    const sortedSum = sum.sort((a, b) => b.totalCount - a.totalCount);

    return sortedSum.slice(0, limit);
  }

  /**
   * Gets all status from the response object
   *
   * @param {Array} skills - total occurrence of each skill
   * @return {Array} - all status
   */
  getStatus(skills: any[]): any[] {
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
   * Triggers the download of report
   *
   * @return {Void}
   */
  downloadReport(): void {
    const reportSummary = this.getReportSummary();
    const downloadLink = document.createElement('a');
    const csvData = this.writeToCsv(this.skills);
    const blob = new Blob([csvData, `${this.lineDelimiter}`, reportSummary], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    downloadLink.href = url;
    downloadLink.download = 'report.csv';
    downloadLink.click();
  }

  /**
   * Writes skills data to csv
   *
   * @param {Array} skillsData - array of skill objects
   * @return {String} report
   */
  writeToCsv(skillsData: any[]): string {
    let report = '';
    const columnDelimiter = ',';

    if (!skillsData || skillsData.length < 1) {
      return 'No Record';
    }

    const keys = Object.keys(skillsData[0]);
    report += keys.join(columnDelimiter);
    report += this.lineDelimiter;

    skillsData.forEach((data) => {
      let column = 0;
      keys.forEach((key) => {
        if (column > 0) {
          report += columnDelimiter;
        }
        report += data[key];
        column += 1;
      });
      report += this.lineDelimiter;
    });

    return report;
  }

  /**
   * Composes the report summary
   *
   * @return {String} - report summary
   */
  getReportSummary(): string {
    const location = this.selectedLocation.length === 0
      ? `Location,All${this.lineDelimiter}`
      : `Location,${this.selectedLocation}${this.lineDelimiter}`;

    const period = this.selectedPeriod.length === 0
      ? `Period,All${this.lineDelimiter}`
      : `Period,Last ${this.selectedPeriod} week(s)${this.lineDelimiter}`;

    const totalRequestMade = `Total Requests,${this.totalRequests}${this.lineDelimiter}`;
    const requestMatched = `Total Requests Matched,${this.totalRequestsMatched}${this.lineDelimiter}`;
    const averageTime = `Average Time to Match,${this.averageTimeToMatch}${this.lineDelimiter}`;

    return `SUMMARY${this.lineDelimiter}${location}${period}${totalRequestMade}${requestMatched}${averageTime}`;
  }
}
