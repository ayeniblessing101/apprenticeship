import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-mentee',
  templateUrl: './mentee.component.html',
  styleUrls: ['./mentee.component.scss']
})
export class MenteeComponent implements OnInit {
  private errorMessage: string;
  private limit: number;
  
  requests: any;
  filteredSkills: any[] = [];
  checkedStatuses: any[] = [];

  constructor(
    private requestService: RequestService,
    private filterService: FilterService
  ) {
    this.limit = 20;
  }

  ngOnInit() {
    this.getMenteeRequests();
    this.watchFilters();
  }

  /**
   * gets 20 requests belonging to a particular mentee from the Lenken API service
   * 
   * @return {Null}
   */
  getMenteeRequests() {
    this.requestService.getMenteeRequests(this.limit)
      .subscribe(
        requests => this.requests = requests,
        error => this.errorMessage = <any>error
      );
  }

  /**
   * watches for any changes in the checkedSkills and checkedStatuses arrays in the filters service
   * 
   */
  watchFilters() {
    this.filterService.getCheckedSkills().subscribe(
      skills => this.filteredSkills = skills
    );
    this.filterService.getCheckedStatuses().subscribe(
      statuses => this.checkedStatuses = statuses
    );
  }
}
