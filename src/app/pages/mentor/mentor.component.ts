import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
})

export class MentorComponent implements OnInit {
  private limit: number;
  private errorMessage: string;
  public requests: any;
  public filteredSkills: any[] = [];
  public checkedStatuses: any[] = [];

  constructor(private requestService: RequestService, private filterService: FilterService) {
    this.limit = 10;
  }

  ngOnInit() {
    this.getMentorRequests(this.limit);
    this.watchFilters();
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
    this.filterService.getCheckedStatuses()
      .subscribe(statuses => this.checkedStatuses = statuses);
    this.filterService.getCheckedSkills()
      .subscribe(skills => this.filteredSkills = skills);
  }
}
