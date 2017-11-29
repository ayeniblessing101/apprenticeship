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

  constructor(
    private requestService: RequestService,
  ) { }

  ngOnInit() {
    this.getPendingRequests();
  }

  /**
   * Get pending requests from Lenken Api service
   *
   * @return {void}
   */
  getPendingRequests() {
    this.requestService.getPendingRequests()
      .toPromise()
      .then(
        (response) => {
          this.loading = false;
          this.requests.awaitingYou =
            this.formatRequestData(response.requestsWithInterests);
          this.requests.awaitingResponse =
            this.formatRequestData(response.requestsInterestedIn);
        },
      );
  }

  /**
   * Formats request data to be displayed
   *
   * @param {Array} requests - contains an array of requests.
   *
   * @return {Array} requestData - formatted requests
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
}
