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
  users: Array<string>;
  totalRequests: number;
  currentPeriod: number | string;
  reports: any;

  constructor(private requestService: RequestService) {
    this.users = ['All Users', 'NBO', 'LOS'];
    this.totalRequests = 0;
    this.periods = {
      'All Time': '',
      'Last 1 week': '1',
      'Last 2 weeks': '2',
      'Last 3 weeks': '3',
      'Last month': '4',
    };
    this.currentPeriod = this.periods['All Time'];
  }

  ngOnInit() {
    this.getReports(this.currentPeriod, '');
  }

  /**
   * returns an array of periods
   *
   * @return {Array}
   */
  getPeriods() {
    return Object.keys(this.periods);
  }

  /**
   * reloads report when md-select changes
   *
   * @param {Event} event - change event
   * @return {Null}
   */
  reloadReport(event) {
    this.getReports(this.periods[event.value], '');
  }

  /**
   * gets all reports from request service
   *
   * @param period {String | Number}, location {String}
   * @return {Void}
   */
  getReports(period?: string | number, location?: string): void {
    let options = {
      period: period,
      location: location
    };

    this.requestService.getReports(options)
      .subscribe(requests => this.reports = requests.skills);
  }
}
