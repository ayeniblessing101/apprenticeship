import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { RequestService } from './../../../services/request.service';
import { RequestSkillPipe } from '../../../pipes/request-skills-pipe';
import { RequestDurationPipe } from '../../../pipes/request-duration.pipe';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent implements OnInit, OnDestroy {
  requests: any[] = []
  loading: boolean;
  request: object;
  sectionGridWidth = '90%';
  noResultMessage: string;
  private subscription: Subscription;

  constructor(
    private requestService: RequestService,
    private searchService: SearchService,
  ) {

    requestService.updatePendingPoolRequestsTable
      .subscribe(() => {
        this.removeRequestFromPendingPool();
      })
  }

  ngOnInit() {
    this.getPendingRequests();
    this.initiateSearchSubscription();
  }

  ngOnDestroy() {
    if (this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
  }
  /**
   * Get pending create-request from Lenken Api service
   *
   * @return {void}
   */
  getPendingRequests() {
    this.loading = true;
    this.requestService.getPendingRequests()
      .toPromise()
      .then(
        (response) => {
          this.requests = response.map((request) => {
            request.created_by_name = request.created_by.fullname;
            request.noOfInterests = request.interested.length;
            return request;
          });
          this.loading = false;
        },
    );

  }

  /**
   * Calls searchService that does a search based on the search term
   *
   * @return {void}
   */
  initiateSearchSubscription() {
    this.searchService.searchTerm.subscribe(
        (currentSearchTerm) => {
          this.searchService.fetchRecords('v2/requests/pending', currentSearchTerm)
            .toPromise()
            .then((response) => {
              this.requests = response;
            });
          this.noResultMessage = `Your search didn't return any results. Try something different.`;
        });

  }
  /**
   * Remove request from pending pool
   *
   * @return {void}
   */
  removeRequestFromPendingPool() {
    if (this.requests.includes(this.request)) {
      const requestLocation = this.requests.indexOf(this.request);
      this.requests.splice(requestLocation, 1);
    }
  }

  /**
   * Initialize request once the pending modal is displayed
   *
   * @param event - event with the request that has been emitted from pending table
   *
   * @return {void}
   */
  setRequest(event) {
    this.request = event;
  }
}
