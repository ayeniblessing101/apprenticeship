import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import * as moment from 'moment';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent implements OnInit {
  errorMessage: string;
  currentPage: number = 1;
  limit: number = 20;
  loading: boolean;
  loadingRequests: boolean;

  requests = [];

  constructor(
    private requestService: RequestService
  ) { }

  ngOnInit() {
    this.getRequests(this.currentPage);
  }

  /**
   * Get requests from the Lenken API service
   *
   * @param {Number} limit - the limit of requests to fetch.
   */
  getRequests(page: number) {
    if(this.loadingRequests) return;

    this.requestService.getRequests(this.limit, page)
      .toPromise()
      .then(
        (response) => {
          this.loadingRequests = response.requests.length < 1 ? true : false;

          // concatenate new request data with previous data
          this.requests =  [
              ...this.requests,
              ...this.formatRequestData(response.requests)
            ];
        },
      )
  }

  /**
   * Fetches request on page scroll
   *
   */
  onScroll() {
    this.currentPage += 1;
  	this.getRequests(this.currentPage);
  }

  /**
   * Formats request data to be displayed
   *
   * @param {Array} requests - contains an array of requests.
   */
  formatRequestData(requests): any {
    let requestData = requests.map((request) => {
      let primarySkills = [];
      let secondarySkills = [];
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

      request.primarySkills = primarySkills.slice(0, 2).join(', ');
      request.secondarySkills = secondarySkills.slice(0, 2).join(', ');
      request.duration = request.duration > 1 ?
      `${request.duration} Months` : `${request.duration} Month`;
      
      request.date = moment(request.created_at).format('MMMM DD, YYYY');

      return request;
    });

    return requestData;
  }

}
