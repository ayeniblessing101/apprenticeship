import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { RequestService } from './../../../services/request.service';
import { UserService } from './../../../services/user.service';
import { Router } from '@angular/router';
import { SearchService } from '../../../services/search.service';
import { SessionService } from './../../../services/session.service';
import { TableHeaderSortHelper } from '../../../helpers/table-header-sort.helper';
import { Subscription } from 'rxjs/Subscription';
import { RequestTypes } from '../../../enums/request-types.enum';
import { UserRolePipe } from '../../../pipes/user-role.pipes';
@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.scss'],
  providers: [UserRolePipe],
})
export class InProgressComponent implements OnInit, OnDestroy {
  errorMessage: string;
  loading: boolean;
  requests: any[];
  sessionDates: any;
  rerender: boolean;
  sectionGridWidth = '75%';
  noResultMessage: string;
  private subscription: Subscription;

  sortCategoryValues = {
    title: 'asc',
    duration: 'asc',
    location: 'asc',
    role: 'asc',
    created_at: 'asc',
  };
  activeSortCategory = null;

  RequestTypes = RequestTypes;

  constructor(
    private requestService: RequestService,
    private sessionService: SessionService,
    private userService: UserService,
    private route: Router,
    private tableHeaderSorterHelper: TableHeaderSortHelper,
    private changeDetector: ChangeDetectorRef,
    private searchService: SearchService,
    private userRolePipe: UserRolePipe,
  ) {
    this.requests = [];
  }

  ngOnInit() {
    this.getInProgressRequests();
    this.initiateSearchSubscription();
  }

  ngOnDestroy() {
    if (this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
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
   * Calls searchService that does a search based on the search term
   *
   * @return {void}
   */
  initiateSearchSubscription() {
    this.searchService.searchTerm.subscribe(
        (currentSearchTerm) => {
          this.searchService.fetchRecords('v2/requests/in-progress', currentSearchTerm)
            .toPromise()
            .then((response) => {
              this.requests = response;
            });
          this.noResultMessage = `Your search didn't return any results. Try something different.`;
        });

  }

  /**
   * Formats the in-progress create-request
   *
   * @param {Array} requests - the array of create-request.
   *
   * @return {Array} inProgressRequests - the array of in progress create-request
   */
  formatInProgressRequests(requests): any {
    const userId = this.userService.getCurrentUser().id;
    const requestsInProgress = requests.map((request) => {
      request.role = this.userRolePipe.transform(request, userId);
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
   * Sorts in-progress requests based on the table header
   *
   * @param {string} headerName - Name of the table column header
   * @param {boolean} headerIsDateType - whether the header is of type date or not
   *
   * @return {void}
   */
  sortInProgressRequestsByHeader(headerName, headerIsDateType = false) {
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
