import { Component, OnInit } from '@angular/core';

import { RequestService } from './../../../services/request.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent implements OnInit {
  requests: any = {
    awaitingYou: null,
    awaitingResponse: null,
  };
  loading: boolean;
  request: object;

  constructor(
    private requestService: RequestService,
  ) {

    requestService.updatePendingPoolRequestsTable
      .subscribe(() => {
        this.removeRequestFromPendingPool();
      })
  }

  ngOnInit() {
    this.getPendingRequests();
  }

  /**
   * Get pending create-request from Lenken Api service
   *
   * @return {void}
   */
  getPendingRequests() {
    this.loading = true;
    this.requestService.getPendingRequests()
      .toPromise()
      .then(
        (response) => {
          this.loading = false;
          this.requests.awaitingYou = response.awaitingYou;
          this.requests.awaitingResponse = response.awaitingResponse;
        },
      );
  }

  /**
   * Remove request from pending pool
   *
   * @return {void}
   */
  removeRequestFromPendingPool() {
    if (this.requests.awaitingYou.includes(this.request)) {
      const requestLocation = this.requests.awaitingYou.indexOf(this.request);
      this.requests.awaitingYou.splice(requestLocation, 1);
    }

    if (this.requests.awaitingResponse.includes(this.request)) {
      const requestLocation = this.requests.awaitingResponse.indexOf(this.request);
      this.requests.awaitingResponse.splice(requestLocation, 1);
    }
  }

  /**
   * Initialize request once the pending modal is displayed
   *
   * @param event - event with the request that has been emitted from pending table
   *
   * @return {void}
   */
  setRequest(event) {
    this.request = event;
  }
}
