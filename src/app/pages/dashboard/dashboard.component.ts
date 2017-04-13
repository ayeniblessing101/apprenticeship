import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { FilterService } from '../../services/filter.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  errorMessage: string;
  requests: any;
  filteredSkills: any[] = [];
  checkedStatuses: any[] = [];

  constructor(
    private requestService: RequestService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.getRequests();
    this.watchFilters();
  }

  /**
  *  getRequests
  *
  *  gets 20 requests from the Lenken API service
  */
  getRequests() {
    this.requestService.getRequests(20)
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
