import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-in-progress-single-view',
  templateUrl: './in-progress-single-view.component.html',
  styleUrls: ['./in-progress-single-view.component.scss'],
})
export class InProgressSingleViewComponent implements OnInit {
  sessionDates: any;
  request: any;
  isRequestScheduleVisible = true;
  isRequestDetailsVisible = false;
  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute,
  ) {
    route.data.subscribe((value) => {
      this.request = value.request;
    });
  }

  ngOnInit() {
    this.assignSessionDates(this.request.id);
  }

  /**
   * Get mentorship dates.
   *
   * @param {number} requestId
   *
   * @return {void}
   */
  assignSessionDates(requestId: number) {
    this.sessionService.fetchSessionDates(requestId)
      .toPromise()
      .then((response) => {
        this.sessionDates = response;
      });
  }

  /**
   * Show request details page and hide request schedule page
   *
   * @return {void}
   */
  showRequestDetails() {
    this.isRequestDetailsVisible = true;
    this.isRequestScheduleVisible = false;
  }

  /**
   * Show request schedule page and hide request details page
   *
   * @return {void}
   */
  showRequestSchedule() {
    this.isRequestDetailsVisible = false;
    this.isRequestScheduleVisible = true;
  }
}
