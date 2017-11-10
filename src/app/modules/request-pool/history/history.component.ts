import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { RequestService } from '../../../services/request.service';
import { HelperService } from '../../../services/helper.service';

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
    private helperService: HelperService,
  ) {}

  ngOnInit() {
    this.getCompletedRequests();
  }

  /**
   * Gets completed requests belonging to the current user
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
   * @return {Object} requests
   */
  formatRequests(usersRequests) {
    const requests = usersRequests.map((request) => {
      const duration = request.duration * 30;
      const oneDay = 1000 * 60 * 60 * 24;
      const startDate = new Date(request.match_date.split(' ')[0]);
      const mentorshipEndDate = new Date(duration * oneDay + startDate.getTime());
      request.endDate = moment(mentorshipEndDate).format('MMMM D, YY');
      request.createdAt = moment(request.created_at).format('MMMM D, YY');
      delete request.created_at;

      request.role = request.mentee_id === this.helperService.getCurrentUser().id ? 'Mentee' : 'Mentor';

      const primarySkills = [];
      request.request_skills.forEach(({ type, name }) => {
        if (type === 'primary') {
          primarySkills.push(name);
        }
      });
      request.skills = primarySkills.join(',');
      delete request.request_skills;

      return request;
    });
    return requests;
  }
}
