import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
})
export class MentorComponent implements OnInit, OnDestroy {
  errorMessage: string;
  requests: any;
  checkedStatuses: any[] = [];
  filterSubscription: any;

  constructor(
    private requestService: RequestService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.getMentorRequests();
    this.watchFilters();
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

  getMentorRequests() {
    this.requestService.getMentorRequests(20)
      .subscribe(
        requests => this.requests = requests,
        error => this.errorMessage = <any>error,
    );
  }

  /**
  *  watchFilters
  *
  *  watches for any changes in the checkedStatuses arrays in the filters service
  */
  watchFilters() {
    this.filterService.getCheckedStatuses().subscribe(
      statuses => this.checkedStatuses = statuses
    );
  }

}
