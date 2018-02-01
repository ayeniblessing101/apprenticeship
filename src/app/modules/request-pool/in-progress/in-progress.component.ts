import { Component, OnInit } from '@angular/core';

import { RequestService } from './../../../services/request.service';
import { UserService } from './../../../services/user.service';
import { Router } from '@angular/router';
import { SessionService } from './../../../services/session.service';

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
  sessionDates: any;

  constructor(
    private requestService: RequestService,
    private sessionService: SessionService,
    private userService: UserService,
    private route: Router,
  ) {
    this.requests = [];
  }

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
        if (response) {
          this.requests = this.formatInProgressRequests(response);
        }
      })
      .then(() => {
        this.fetchAllSessionDates(this.requests);
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

      if (request.mentor_id === this.user.id) {
        request.role = 'Mentor'
      } else if (request.mentee_id === this.user.id) {
        request.role = 'Mentee'
      }

      return request;
    });
    return requestsInProgress;
  }

  /**
   * Redirect to the single view component.
   *
   * @param {number} id - request id
   *
   * @return {void}
   * */
  goToSingleViewPage(id: number) {
    this.route.navigate(['request-pool/in-progress/', id]);
  }

  /**
   * Assign all session dates to session dates variable.
   *
   * @return {void}
   */
  fetchAllSessionDates(requests: any[]) {
    this.sessionDates = [];
    for (const request of requests) {
      this.sessionService.fetchSessionDates(request.id)
        .toPromise()
        .then((currentSessionDates) => {
          if (currentSessionDates) {
            this.sessionDates = this.sessionDates.concat(currentSessionDates);
          }
        });
    }
  }
}
