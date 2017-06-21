import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss']
})
export class AdminReportComponent implements OnInit {
  mode = 'determinate';
  periods: {};
  locations: {};
  skills: any[];
  totalSkillCount: number;
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
    this.skills = [{}];
    this.totalSkillCount = 0;
    this.totalRequests = 0;
    this.totalRequestsMatched = 0;
    this.sessionsCompleted = 0;
    this.averageTimeToMatch = '0';
    this.locations = {
      'All': '',
      'Lagos': 'Lagos',
      'Nairobi': 'Nairobi'
    };
    this.periods = {
      'All time': '',
      'Last 1 week': '1',
      'Last 2 weeks': '2',
      'Last 3 weeks': '3',
      'Last month': '4'
    };
    this.selectedPeriod = '';
    this.selectedLocation = '';
    this.include = [
      'totalRequests',
      'totalRequestsMatched',
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
   * gets all reports from request service
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
      include
    };

    this.loading = true;

    this.requestService.getReports(options)
      .subscribe((report) => {
        this.loading = false;
        this.totalRequests = report.totalRequests;
        this.totalRequestsMatched = report.totalRequestsMatched;
        this.averageTimeToMatch = report.averageTimeToMatch;
        this.totalSkillCount = this.getTotalSkillCount(report.skills_count);
        this.skills = this.calculatePercentage(report.skills_count);
      });
  }

  /**
   * fetches new report when location or period changes
   *
   * @param {Event} event - change event
   * @return {Void}
   */
  reloadReport(event): void {
    if (this.locations.hasOwnProperty(event.value)) {
      this.selectedLocation = this.locations[event.value];
    } else {
      this.selectedPeriod = this.periods[event.value];
    }
    this.getReports(this.selectedPeriod, this.selectedLocation, this.include.join());
  }

  /**
   * calculates the skill percentage occurence
   *
   * @param {Array} skills - total occurence of each skill
   * @return {Array} - percentage occurence
   */
  calculatePercentage(skills: any[]): any[] {
    const unsorted =  skills.map((skill) => {
      skill.percentage = ((skill.count / this.totalSkillCount) * 100).toFixed(2);
      return skill;
    });
    return unsorted.sort((skill, nextSkill) => {
      return nextSkill.percentage - skill.percentage;
    });
  }

  /**
   * calculates the total number of skills per report
   *
   * @param {Array} skills - array of skill objects
   * @return {Number} total skill count
   */
  getTotalSkillCount(skills: any[]): number {
    return skills.reduce((total, skill) => {
      return total + skill.count;
    }, 0);
  }

  /**
   * triggers the download of report
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
   * writes skills data to csv
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
   * composes the report summary
   *
   * @return {String} - report summary
   */
  getReportSummary(): string {
    const location = this.selectedLocation.length === 0
      ? `Location,All${this.lineDelimiter}`
      : `Location,${this.selectedLocation}${this.lineDelimiter}`;

    const period = this.selectedPeriod.length === 0
      ? `Period,All${this.lineDelimiter}`
      : `Period,${this.selectedPeriod}${this.lineDelimiter}`;

    const totalRequestMade = `Total Requests,${this.totalRequests}${this.lineDelimiter}`;
    const requestMatched = `Total Requests Matched,${this.totalRequestsMatched}${this.lineDelimiter}`;
    const averageTime = `Average Time to Match,${this.averageTimeToMatch}${this.lineDelimiter}`;

    return `SUMMARY${this.lineDelimiter}${location}${period}${totalRequestMade}${requestMatched}${averageTime}`;
  }
}
