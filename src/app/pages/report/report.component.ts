import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  mode = 'determinate';
  bufferValue = 0;
  periods: {};
  users: Array<string>;
  skillStatistics: Array<any>;
  totalRequests: number;
  currentPeriod: number | string;
  limit: number;

  constructor(
    private requestService: RequestService,
  ) {
    this.users = ['Admin', 'Mentor', 'Mentee'];

    // dummy skill distribution stats, to be replaced by actual API call
    this.skillStatistics = [
      {
        name: 'Javascript',
        percentage: 40
      },
      {
        name: 'Python',
        percentage: 20
      },
      {
        name: 'Ruby',
        percentage: 10
      },
      {
        name: 'Java',
        percentage: 10
      }
    ];
    this.totalRequests = 0;
    this.periods = {
      'All': 'ALL',
      'Last 1 week': '1',
      'Last 2 weeks': '2',
      'Last 1 month': '4',
      'Last 2 months': '8',
    };
    this.currentPeriod = 'ALL';
    this.limit = 1000;
  }

  ngOnInit() {
    this.getRequestsByPeriod(this.currentPeriod, this.limit);
  }

  /**
   * fetches requests within a specified period
   *
   * @param {Number|String} period
   * @param {Number} limit - max number of results to be retrieved
   * @return {Null}
   */
  getRequestsByPeriod(period?: number | string, limit?: number): void {
    this.requestService.getRequestsByPeriod(period, limit)
      .subscribe(requests => this.totalRequests = requests.length);
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
    this.getRequestsByPeriod(this.periods[event.value], this.limit);
  }
}
