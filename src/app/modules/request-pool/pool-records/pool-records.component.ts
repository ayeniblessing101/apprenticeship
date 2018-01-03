import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pool-records',
  templateUrl: './pool-records.component.html',
  styleUrls: ['./pool-records.component.scss'],
})
export class PoolRecordsComponent {
  showRequest = false;
  @Input() requests = [];
  selectedRequest: object;

  /** Get details of the request clicked by the user
   * in the request pool. Changes showRequest to true
   * making the modal pop up
   *
   * @param {Object} request - the clicked request details
   *
   * @return {void}
   */
  showRequestDetails(request) {
    this.selectedRequest = request;
    this.showRequest = true;
  }

  /**
   * Changes showRequest to false and closes
   * the modal
   *
   * @return {void}
   */
  closeRequest() {
    this.showRequest = false;
  }
}
