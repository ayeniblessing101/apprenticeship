import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
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

  constructor(private requestService: RequestService, private filterService: FilterService) {
    this.limit = 10;
  }

  ngOnInit() {
    this.getMentorRequests(this.limit);
    this.watchFilters();
  }
  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
    this.interestFilterSubscription.unsubscribe();
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
      .subscribe(
        (interested) => {
          if (interested.length) {
            interested.splice(0, 1);
          }
          this.filteredInterest = interested;
        }
      );
  }
}
