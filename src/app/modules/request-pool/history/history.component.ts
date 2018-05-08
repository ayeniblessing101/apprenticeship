import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { TableHeaderSortHelper } from '../../../helpers/table-header-sort.helper';
import { SearchService } from '../../../services/search.service';
import { Subscription } from 'rxjs/Subscription';
import { RequestTypes } from '../../../enums/request-types.enum';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [RequestService],
})
export class HistoryComponent implements OnInit, OnDestroy {
  loading: boolean;
  requests: any[];
  rerender: boolean;
  sectionGridWidth = '90%';
  noResultMessage: string;
  private subscription: Subscription;

  sortCategoryValues = {
    title: 'asc',
    duration: 'asc',
    match_date: 'asc',
    endDate: 'asc',
    role: 'asc',
    rating: 'asc',
  };
  activeSortCategory = null;

  requestTypes = RequestTypes;

  constructor(
    private requestService: RequestService,
    private userService: UserService,
    private route: Router,
    private tableHeaderSorterHelper: TableHeaderSortHelper,
    private changeDetector: ChangeDetectorRef,
    private searchService: SearchService,
  ) {
  }

  ngOnInit() {
    this.getCompletedRequests();
    this.initiateSearchSubscription();
  }

  ngOnDestroy() {
    if (this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
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
          this.getUserRating(this.requests)
        },
    )
  }

  /**
   * Gets user rating details
   *
   * @return {void}
   */
  getUserRating(requests: any[]) {
    for (const request of requests) {
      this.userService.getRating(request.created_by.id)
      .toPromise()
      .then((response) => {
        request.rating = (request.request_type_id === this.requestTypes.MENTEE_REQUEST)
        ? response.mentee_average : response.mentor_average;
      });
    }
  }

 /**
   * Calls searchService that does a search based on the search term
   *
   * @return {void}
   */
  initiateSearchSubscription() {
    this.searchService.searchTerm.subscribe(
        (currentSearchTerm) => {
          this.searchService.fetchRecords('v2/requests/history', currentSearchTerm)
            .toPromise()
            .then((response) => {
              this.requests = response;
            });
          this.noResultMessage = `Your search didn't return any results. Try something different.`;
        });

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
      request.endDate = new Date(duration * oneDay + startDate.getTime());
      request.role = request.request_type_id === 2 ? 'Mentee' : 'Mentor';
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
   * Sorts history records based on the table header
   *
   * @param {string} headerName - Name of the table column header
   * @param {boolean} headerIsDateType - whether the header is of type date or not
   *
   * @return {void}
   */
  sortHistoryRequestsByHeader(headerName, headerIsDateType = false) {
    this.tableHeaderSorterHelper.sortTableWithHeader(
      headerName,
      headerIsDateType,
      this.requests,
      this.activeSortCategory,
      this.sortCategoryValues,
    );

    this.activeSortCategory = headerName;
    this.rerender = true;
    this.changeDetector.detectChanges();
    this.rerender = false;
  }

}
