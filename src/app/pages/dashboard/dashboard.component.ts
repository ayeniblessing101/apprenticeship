import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { RequestService } from '../../services/request.service';
import { FilterService } from '../../services/filter.service';
import { HelperService as Helper } from '../../services/helper.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  errorMessage: string;
  requests: any;
  filteredSkills: any[] = [];
  checkedStatuses: any[] = [];
  statusFilterSubscription: any;
  autoFilterStatus: boolean;

  constructor(
    private requestService: RequestService,
    private filterService: FilterService,
    private authService: AuthService,
    public snackBar: MdSnackBar,
    public helper: Helper,
  ) {
    this.autoFilterStatus = true;
  }

  ngOnInit() {
    if (this.authService.notice === 'unauthorized') {
      this.snackBar.open('You are not authorized to view the Admin page', 'Unathorized', {
        duration: 8000,
      });
    }

    this.getRequests();
    this.watchFilters();
  }

  ngOnDestroy() {
    this.statusFilterSubscription.unsubscribe();
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
        error => this.errorMessage = <any>error,
      );
  }

  /**
   * checks if the logged in user is the owner of the request
   *
   * @param {object} request mentorshp request to verify
   *
   * @return {boolean} whether or not the logged in user owns the request
   */
  isRequestOwner(request: any): boolean {
    return request.mentee_id === this.authService.userInfo.id;
  }

  /**
  *  watchFilters
  *
  *  watches for any changes in the checkedSkills and checkedStatuses arrays in the filters service
  */
  watchFilters() {
    this.filterService.getCheckedSkills().subscribe(
      skills => this.filteredSkills = skills,
    );

    this.statusFilterSubscription = this.filterService.getCheckedStatuses()
      .subscribe((statuses) => {
        this.filterService.toggleStatus('open');
        this.checkedStatuses = statuses;
      });
  }
}
