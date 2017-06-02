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
  skills: Array<Object>;
  totalSkillCount: number;
  totalRequests: number;
  totalRequestsMatched: number;
  sessionsCompleted: number;
  atm: number;
  selectedPeriod: string;
  selectedLocation: string;
  include: Array<string>;
  loading: boolean;

  constructor(
    private requestService: RequestService,
  ) {
    this.skills = [{}];
    this.totalSkillCount = 0;
    this.totalRequests = 0;
    this.totalRequestsMatched = 0;
    this.sessionsCompleted = 0;
    this.atm = 0;
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
    this.include = ['totalRequests', 'totalRequestsMatched'];
    this.loading = false;
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
        this.skills = report.skills_count;
        this.totalRequests = report.totalRequests;
        this.totalRequestsMatched = report.totalRequestsMatched;
        this.totalSkillCount = this.getTotalSkillCount(this.skills);
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
   * @param {Number} skillCount - total occurence of each skill
   * @return {Number} - percentage occurence
   */
  getPercentage(skillCount: number): number {
    return ((skillCount / this.totalSkillCount) * 100);
  }

  /**
   * calculates the total number of skills per report
   *
   * @param {Array} skills - array of skill objects
   * @return {Number} total skill count
   */
  getTotalSkillCount(skills: Array<any>): number {
    return skills.reduce((total, skill) => {
      return total + skill['count'];
    }, 0);
  }
}
