import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { RequestService } from './../../../services/request.service';
import { UserService } from './../../../services/user.service';
import { Router } from '@angular/router';
import { SessionService } from './../../../services/session.service';
import { SortingHelper } from '../../../helpers/sorting.helper';

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
  rerender: boolean;
  sectionGridWidth = '75%';

  sortCategoryValues = {
    title: 'asc',
    duration: 'asc',
    location: 'asc',
    role: 'asc',
    created_at: 'asc',
  };

  activeSortCategory = null;

  constructor(
    private requestService: RequestService,
    private sessionService: SessionService,
    private sortingHelper: SortingHelper,
    private userService: UserService,
    private route: Router,
    private changeDetector: ChangeDetectorRef,
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

  /**
   * This method sorts in-progress requests based on the table header.
   *
   * @param {String} headerName - Name of the table column header
   * @param {Boolean} headerIsDateType - whether the header is of type date or not
   *
   * @return {void}
   */
  sortInProgressRequestsByHeader(headerName, headerIsDateType = false) {

    if (this.activeSortCategory !== headerName && !this.checkRequestHeaderHasValue(headerName)) {
      return;
    }

    let sortingOrder = this.sortCategoryValues[headerName];

    if (this.activeSortCategory === headerName) {
      sortingOrder = this.sortCategoryValues[headerName] === 'asc' ? 'desc' : 'asc';
    }

    this.sortingHelper.sortRequestsByHeader(
      this.requests, headerName, headerIsDateType, sortingOrder,
    );

    this.sortCategoryValues[headerName] = sortingOrder;
    this.activeSortCategory = headerName;
    this.rerender = true;
    this.changeDetector.detectChanges();
    this.rerender = false;
  }

  /**
   * Checks whether the column of a request table header is not null
   *
   * @return {Boolean} - Result of whether the table header has column value or not
   */
  checkRequestHeaderHasValue(headerName) {
    const headerValueIndex = this.requests.findIndex((request) => {
      return !!request[headerName];
    });

    return headerValueIndex !== -1;
  }
}
