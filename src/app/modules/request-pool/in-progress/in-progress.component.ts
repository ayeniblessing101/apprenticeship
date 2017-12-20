import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

import { RequestService } from './../../../services/request.service';
import { UserService } from './../../../services/user.service';

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
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getInProgressRequests();
  }

  /**
   * Gets in progress create-request belonging to the current user
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
   * Formats the in-progress create-request
   *
   * @param {Array} requests - the array of create-request.
   *
   * @return {Array} inProgressRequests - the array of in progress create-request
   */
  formatInProgressRequests(requests): any {
    const requestsInProgress = requests.map((request) => {
      this.user = this.userService.getCurrentUser();
      const primarySkills = [];

      request.request_skills.forEach(({ type, name }) => {
        if (type === 'primary') {
          primarySkills.push(name);
        }
      });

      request.primarySkills = primarySkills.slice(0, 2).join(', ');
      request.dateStarted = moment(request.created_at).format('MMMM DD, YYYY');
      request.duration = request.duration > 1 ? `${request.duration} months` : `${request.duration} month`;

      if (request.mentor_id === this.user.id) {
        request.role = 'Mentor'
      } else if (request.mentee_id === this.user.id) {
        request.role = 'Mentee'
      }

      return request;
    });
    return requestsInProgress;
  }
}
