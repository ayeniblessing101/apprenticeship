import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [RequestService],
})

export class HistoryComponent implements OnInit {
  loading: boolean;
  requests: any[];
  constructor(
    private requestService: RequestService,
    private userService: UserService,
    private route: Router,
  ) {}

  ngOnInit() {
    this.getCompletedRequests();
  }

  /**
   * Gets completed create-request belonging to the current user
   *
   * @return {Void}
   */
  getCompletedRequests() {
    this.loading = true;
    this.requestService.getUserHistory()
      .toPromise()
      .then(
      (response) => {
        this.loading = false;
        this.requests = this.formatRequests(response);
      },
    )
  }

  /**
   * Formats the data from the api to caluculate the mentorship end date,
   * get the primary skills and to check the role of the user per request
   * @param {Object} usersRequests
   * @return {Object} create-request
   */
  formatRequests(usersRequests) {
    const requests = usersRequests.map((request) => {
      const duration = request.duration * 30;
      const oneDay = 1000 * 60 * 60 * 24;
      const startDate = new Date(request.match_date.split(' ')[0]);
      const mentorshipEndDate = new Date(duration * oneDay + startDate.getTime());
      request.endDate = mentorshipEndDate;
      request.role = request.mentee_id === this.userService.getCurrentUser().id ? 'Mentee' : 'Mentor';
      return request;
    });
    return requests;
  }

  /**
   * Navigate to history page to view details and schedules
   *
   * @param {number} requestId - Id of the request we need to see history for
   *
   * @return {void}
   */
  gotoRequestDetails(requestId) {
    this.route.navigate(['request-pool/history/', requestId]);
  }

}
