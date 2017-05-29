import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { FilterService } from '../../services/filter.service';
import { SkillService } from '../../services/skill.service';
import { HelperService as Helper } from '../../services/helper.service';

@Component({
  selector: 'app-mentee',
  templateUrl: './mentee.component.html',
  styleUrls: ['./mentee.component.scss'],
})
export class MenteeComponent implements OnInit {
  private errorMessage: string;
  private limit: number;

  requests: any;
  filteredSkills: any[] = [];
  checkedStatuses: any[] = [];
  menteeFilters: any = {
    Primary: [],
    Status: [],
  };

  constructor(
    private requestService: RequestService,
    private filterService: FilterService,
    private skillService: SkillService,
    public helper: Helper,
  ) {
    this.limit = 20;
  }

  ngOnInit() {
    this.getMenteeRequests();
    this.getSkills();
    this.getStatus();
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
        error => this.errorMessage = <any>error,
      );
  }

  /**
   * getSkills
   *
   * gets skills from the Lenken API service
   */
  getSkills() {
    this.skillService.getSkills()
      .subscribe(
        skills => this.menteeFilters['Primary'] = skills,
        error => this.errorMessage = <any>error,
      );
  }

  /**
   * getStatus
   *
   * gets statuses from the Lenken API service
   */
  getStatus() {
    this.requestService.getStatus()
      .subscribe(
        status => this.menteeFilters['Status'] = status,
        error => this.errorMessage = <any>error,
      );
  }

  /**
   * function that handles the event emitted from the
   * <app-filters> child component
   *
   * @param {object} eventData Object that contains,
   * the event emitted, the filter selected
   * and the value of the filter selected
   */
  menteeFilter(eventData) {
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
    }
  }
}
