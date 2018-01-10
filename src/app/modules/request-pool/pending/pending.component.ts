import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

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
          this.requests.awaitingYou =
            this.formatRequestData(response.awaitingYou);
          this.requests.awaitingResponse =
            this.formatRequestData(response.awaitingResponse);
        },
      );
  }

  /**
   * Formats request data to be displayed
   *
   * @param {Array} requests - contains an array of create-request.
   *
   * @return {Array} requestData - formatted create-request
   */
  formatRequestData(requests): any {
    const requestData = requests.map((request) => {
      const primarySkills = [];
      const secondarySkills = [];
      request.request_skills.forEach(({ type, name }) => {
        switch (type) {
          case 'primary':
            primarySkills.push(name);
            break;
          case 'secondary':
            secondarySkills.push(name);
            break;
        }
      });

      request.primarySkills = primarySkills.join(', ');
      request.secondarySkills = secondarySkills.join(', ');
      delete request.request_skills;
      request.duration = request.duration > 1 ?
      `${request.duration} Months` : `${request.duration} Month`;
      request.date = moment(request.created_at).format('MMMM DD, YYYY');

      return request;
    });
    return requestData;
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
