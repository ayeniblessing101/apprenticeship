import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { FilterService } from '../../services/filter.service';
import { HelperService as Helper } from '../../services/helper.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss'],
})
export class MentorComponent implements OnInit, OnDestroy {
  private limit: number;
  errorMessage: string;
  requests: any;
  filteredSkills: any[] = [];
  checkedStatuses: any[] = [];
  filterSubscription: any;
  filteredInterest: any[];
  interestFilterSubscription: any;
  statusFilterSubscription: any;
  autoFilterStatus: boolean;

  constructor(
    private requestService: RequestService,
    private filterService: FilterService,
    public helper: Helper,
  ) {
    this.limit = 10;
    this.autoFilterStatus = true;
  }

  ngOnInit() {
    this.getMentorRequests(this.limit);
    this.watchFilters();
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
    this.interestFilterSubscription.unsubscribe();
    this.statusFilterSubscription.unsubscribe();
  }

  /**
   * gets all Mentor requests from request service
   *
   * @param {Number} limit - number of requests to return
   * @return {Void}
   */
  getMentorRequests(limit: number): void {
    this.requestService.getMentorRequests(limit)
      .subscribe(
        requests => this.requests = requests,
        error => this.errorMessage = <any>error,
      );
  }

  /**
  * watchFilters
  *
  * watches for any changes in the checkedStatuses and checkedSkills arrays in the filters service
  * @return {Void}
  */
  watchFilters(): void {
    this.filterSubscription = this.filterService.getCheckedStatuses()
      .subscribe(statuses => this.checkedStatuses = statuses);

    this.filterService.getCheckedSkills()
      .subscribe(skills => this.filteredSkills = skills);

    this.interestFilterSubscription = this.filterService.getInterestedStatus()
      .subscribe((interested) => {
        if (interested.length) {
          interested.splice(0, 1);
        }

        this.filteredInterest = interested;
      },
    );

    this.statusFilterSubscription = this.filterService.getCheckedStatuses()
      .subscribe((statuses) => {
        this.filterService.toggleStatus('open');
        this.checkedStatuses = statuses;
      });
  }

  /**
  * This singularizes or pluralarizes the months on the duration column
  *
  * @param {number} numOfMonths
  *
  * @return {string} formatted version of months
  */
  formatMonth(numOfMonths: number): string {
    return numOfMonths > 1 ? 'months' : 'month';
  }
}
