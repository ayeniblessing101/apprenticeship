import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

import { RequestService } from './../../../services/request.service';
import { HelperService } from './../../../services/helper.service';

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.scss'],
})

export class InProgressComponent implements OnInit {
  errorMessage: string;
  loading: boolean;
  requests: any[];
  user;

  constructor(
    private requestService: RequestService,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.getInProgressRequests();
  }

  /**
   * Gets in progress requests belonging to the current user
   *
   */
  getInProgressRequests(): void {
    this.loading = true;
    this.requestService.getInProgressRequests()
      .toPromise()
      .then((response) => {
        this.loading = false;
        this.requests = this.formatInProgressRequests(response);
      })
      .catch(error => this.errorMessage = error);
  }

  /**
   * Formats the in-progress requests
   * 
   * @param {Array} requests - the array of requests.
   *
   * @return {Array} inProgressRequests - the array of in progress requests
   */
  formatInProgressRequests(requests): any {
    const requestsInProgress = requests.map(request => {
      this.user = this.helperService.getCurrentUser();
      const primarySkills = [];

      request.request_skills.forEach(({ type, name }) => {
        if (type === 'primary') {
          primarySkills.push(name);
        }
      });

      request.primarySkills = primarySkills.slice(0, 2).join(', ');
      request.dateStarted = moment(request.created_at).format('MMMM DD, YYYY');
      request.duration = request.duration > 1 ? `${request.duration} months` : `${request.duration} month`;

      if(request.mentor_id === this.user.id) {
        request.role = 'Mentor'
      } else if(request.mentee_id === this.user.id) {
        request.role = 'Mentee'
      }

      return request;
    });
    return requestsInProgress;
  }
}
