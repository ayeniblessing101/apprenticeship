import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { AuthService } from '../../services/auth.service';
import { FilterService } from '../../services/filter.service';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss'],
})
export class MentorComponent implements OnInit, OnDestroy {
  private limit: number;
  errorMessage: string;
  requests: any;
  userId: string;

  selectedSkillsId: any[] = [];
  selectedStatusesId: any[] = [];

  skillFilterSubscription: any;
  statusFilterSubscription: any;

  autoFilterStatus: boolean;
  mentorFilters: any = {
    Primary: [],
    Status: [],
  };

  loading: boolean;
  @Input() currentPage;
  @Input() itemsPerPage;
  @Input() totalItems;

  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private filterService: FilterService,
    private skillService: SkillService,
  ) {
    this.limit = 10;
    this.autoFilterStatus = true;
    this.userId = this.authService.userInfo.id;
  }

  ngOnInit() {
    this.getMentorRequests(this.currentPage);
    this.getUserSkills();
    this.getStatus();
  }

  ngOnDestroy() {
    this.skillFilterSubscription.unsubscribe();
    this.statusFilterSubscription.unsubscribe();
  }

  /**
   * Get 20 requests from the Lenken API service
   *
   * @param {Number} page - the page number to view.
   */
  getMentorRequests(page: number) {
    this.currentPage = page;
    this.loading = true;
    const params = {
      skills: this.selectedSkillsId,
      status: this.selectedStatusesId,
      mentor: true,
    };

    this.requestService.getRequests(20, page, params)
      .toPromise()
      .then(
        (response) => {
          this.loading = false;
          this.requests = response.requests,
            this.itemsPerPage = response.pagination['pageSize'],
            this.totalItems = response.pagination['totalCount']
        },
      )
      .catch(error => this.errorMessage = error);
  }

  /**
   * getUserSkills
   *
   * gets current user's skills from the Lenken API service
   */
  getUserSkills() {
    this.skillFilterSubscription = this.skillService.getUserSkills(this.userId)
      .subscribe(
        skills => this.mentorFilters['Primary'] = skills,
        error => this.errorMessage = <any>error,
      );
  }

  /**
   * Retrieves the full name from the passed email
   *
   * @param {String} email
   * @return {String} username
   */
  getMenteeName(email) {
    if (!email) {
      return email;
    }

    // remove the '@' email suffix to get the user's full name
    let userName = email.match(/(.+)@/);
    userName = userName[1].split('.');

    return userName.join(' ');
  }

  /**
   * getStatus
   *
   * gets statuses from the Lenken API service
   */
  getStatus() {
    this.statusFilterSubscription = this.requestService.getStatus()
      .subscribe(
        status => this.mentorFilters['Status'] = status,
        error => this.errorMessage = <any>error,
      );
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

  /**
   * function that handles the event emitted from the <app-filters>
   * child component
   *
   * @param {object} eventData Object that contains, the event emitted,
   * the filter selected and the value selected
   */
  mentorFilter(eventData) {
    if (eventData.filterName === 'Primary') {
      // toggle clicked primary skill
      if (eventData.eventType) {
        this.selectedSkillsId.push(eventData.itemId);
      } else {
        const pos = this.selectedSkillsId.indexOf(eventData.itemId);
        this.selectedSkillsId.splice(pos, 1);
      }

    } else if (eventData.filterName === 'Status') {
      // toggle clicked status
      if (eventData.eventType) {
        this.selectedStatusesId.push(eventData.itemId);
      } else {
        const pos = this.selectedStatusesId.indexOf(eventData.itemId);
        this.selectedStatusesId.splice(pos, 1);
      }
    }

    this.getMentorRequests(1);
  }
}
