import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { SortingHelper } from '../../../helpers/sorting.helper';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [RequestService],
})

export class HistoryComponent implements OnInit {
  loading: boolean;
  requests: any[];
  rerender: boolean;

  sortCategoryValues = {
    title: 'asc',
    duration: 'asc',
    match_date: 'asc',
    endDate: 'asc',
    role: 'asc',
    rating: 'asc',
  };

  activeSortCategory = null;

  constructor(
    private requestService: RequestService,
    private sortingHelper: SortingHelper,
    private userService: UserService,
    private route: Router,
    private changeDetector: ChangeDetectorRef,
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
   *
   * @param {Object} usersRequests
   *
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

  /**
   * Sorts history requests based on the table header
   *
   * @param {String} headerName - Name of the table column header
   * @param {Boolean} headerIsDateType - whether the header is of type date or not
   *
   * @return {void}
   */
  sortHistoryRequestsByHeader(headerName, headerIsDateType = false) {

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
