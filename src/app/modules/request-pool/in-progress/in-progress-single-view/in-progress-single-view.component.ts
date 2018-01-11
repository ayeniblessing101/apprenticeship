import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../../../services/request.service';
import * as moment from 'moment'

@Component({
  selector: 'app-in-progress-single-view',
  templateUrl: './in-progress-single-view.component.html',
  styleUrls: ['./in-progress-single-view.component.scss'],
})
export class InProgressSingleViewComponent implements OnInit {

  requestTitle: string;
  sessions: any[];
  nextSessionDate: any;
  pageWidth: string;

  constructor(
    private requestService: RequestService,
    private route: ActivatedRoute,
  ) {
    this.nextSessionDate = null;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = Number.parseInt(params['id']);
      this.assignNextSessionDate(id);
    });
  }

  /**
   * Assign sessions from request service.
   *
   * @param {Number} requestId - ID of the request.
   *
   *@return {void}
   */
  assignSessions(requestId: number) {
    this.requestService.getRequestSessions(requestId)
      .toPromise()
      .then((response) => {
        this.sessions = response;
        let sessionsCount = this.sessions.length;
        if (this.nextSessionDate) {
          sessionsCount += 1;
        }
        this.pageWidth = (sessionsCount * 450).toString().concat('px');
      })
  }

  /**
   * Assign next session date.
   *
   * @param {number} requestId - request id.
   *
   * @return {void}
   */
  assignNextSessionDate(requestId: number) {
    this.requestService.getRequestDetails(requestId)
      .toPromise()
      .then((response) => {
        this.requestTitle = response.data.title;
        const startDateClone = moment(response.data.match_date).clone();
        const mentorshipEndDate = startDateClone.add(response.data.duration, 'months');
        for (const day of response.data.pairing.days) {
          if (moment().day(day).day() > moment().day() && moment().isBefore(mentorshipEndDate)) {
            this.nextSessionDate = this.formatSessionDate(moment().day(day).format('YYY MM DD'));
            break;
          }
        }
        if (this.nextSessionDate === undefined) {
          const firstDay = moment().day(response.data.pairing.days[0]).day();
          const nextDay = moment().day(firstDay).add(1, 'weeks');
          if (nextDay.day() < mentorshipEndDate.day()) {
            this.nextSessionDate = this.formatSessionDate(nextDay.format('YYY MM DD'));
          }
        }
        this.assignSessions(requestId);
      })
  }

  /**
   * Format session date.
   *
   * @param {moment.Moment} date
   *
   * @return {string}
   */
  formatSessionDate(date: string) {
    const sessionDate = moment(date);
    const today = moment();
    if (sessionDate.isSame(today)) {
      return 'Today';
    }
    return sessionDate.format('MMM DD');
  }
}
