import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent {
  request: any;
  showAddFileButton = false;
  showLogSessionButton = false;
  showConfirmSessionButton = false;
  isRequestScheduleVisible = true;
  isRequestDetailsVisible = false;
  constructor(
    private route: ActivatedRoute,
  ) {
    route.data.subscribe((value) => {
      this.request = value.request;
    });
  }

  /**
   * Shows request schedule view and hide detail view
   *
   * @return {void}
   */
  showRequestSchedule() {
    this.isRequestDetailsVisible = false;
    this.isRequestScheduleVisible = true;
  }

  /**
   * Shows request detail view and hide schedule view
   *
   * @return {void}
   */
  showRequestDetail() {
    this.isRequestDetailsVisible = true;
    this.isRequestScheduleVisible = false;
  }
}
