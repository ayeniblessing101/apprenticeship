import { Component, OnInit } from '@angular/core';

import { RequestService } from './../../../services/request.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent implements OnInit {
  requests: any[] = []
  loading: boolean;
  request: object;
  sectionGridWidth = '90%';

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
          this.requests = response;
        },
    );
  }

  /**
   * Remove request from pending pool
   *
   * @return {void}
   */
  removeRequestFromPendingPool() {
    if (this.requests.includes(this.request)) {
      const requestLocation = this.requests.indexOf(this.request);
      this.requests.splice(requestLocation, 1);
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
