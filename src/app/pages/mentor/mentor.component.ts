import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { AuthService } from '../../services/auth.service';
import { FilterService } from '../../services/filter.service';
import { SkillService } from '../../services/skill.service';
import { HelperService as Helper } from '../../services/helper.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss'],
})
export class MentorComponent implements OnInit, OnDestroy {
  private limit: number;
  errorMessage: string;
  interested: any[] = [];
  requests: any;
  userId: string;

  filteredSkills: any[] = [];
  checkedStatuses: any[] = [];
  filteredInterest: any[] = [];

  requestSubscription: any;
  skillFilterSubscription: any;
  statusFilterSubscription: any;

  autoFilterStatus: boolean;
  mentorFilters: any = {
    Primary: [],
    Status: [],
    Interested: [],
  };

  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private filterService: FilterService,
    private skillService: SkillService,
    public helper: Helper,
  ) {
    this.limit = 10;
    this.autoFilterStatus = true;
    this.userId = this.authService.userInfo.id;
    this.interested.push({ name: 'Yes' });
  }

  ngOnInit() {
    this.getMentorRequests(this.limit);
    this.getUserSkills();
    this.getStatus();
    this.getInterested();
  }

  ngOnDestroy() {
    this.requestSubscription.unsubscribe();
    this.skillFilterSubscription.unsubscribe();
    this.statusFilterSubscription.unsubscribe();
  }

  /**
   * gets all Mentor requests from request service
   *
   * @param {Number} limit - number of requests to return
   * @return {Void}
   */
  getMentorRequests(limit: number): void {
    this.requestSubscription = this.requestService.getMentorRequests(limit)
      .subscribe(
        requests => this.requests = requests,
        error => this.errorMessage = <any>error,
      );
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
   * getInterested
   *
   * gets statuses from the Lenken API service
   */
  getInterested() {
    this.mentorFilters['Interested'] = this.interested;
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
        this.filteredSkills.push(eventData.itemName);
      } else {
        const pos = this.filteredSkills.indexOf(eventData.itemName);
        this.filteredSkills.splice(pos, 1);
      }
    } else if (eventData.filterName === 'Status') {
      // toggle clicked status
      if (eventData.eventType) {
        this.checkedStatuses.push(eventData.itemName);
      } else {
        const pos = this.checkedStatuses.indexOf(eventData.itemName);
        this.checkedStatuses.splice(pos, 1);
      }
    } else if (eventData.filterName === 'Interested') {
      if (eventData.type) {
        this.filteredInterest.push(eventData.itemName);
      }
    }
  }
}
