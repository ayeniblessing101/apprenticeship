import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { FilterService }     from '../../services/filter.service';

@Component({
  selector: 'app-mentee',
  templateUrl: './mentee.component.html',
  styleUrls: ['./mentee.component.scss']
})

export class MenteeComponent implements OnInit {
  errorMessage: string;
  requests: any;
  filteredSkills: any[] = [];
  checkedStatuses: any[] = [];

  constructor(
    private requestService: RequestService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.getMenteeRequests();
    this.watchFilters();
  }

  /**
  *  getMenteeRequests
  *
  *  gets 20 requests belonging to a particular mentee from the Lenken API service
  */
  getMenteeRequests() {
    this.requestService.getMenteeRequests(20)
      .subscribe(
        requests => this.requests = requests,
        error => this.errorMessage = <any>error
      );
  }

  /**
  *  watchFilters
  *
  *  watches for any changes in the checkedSkills and checkedStatuses arrays in the filters service
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
