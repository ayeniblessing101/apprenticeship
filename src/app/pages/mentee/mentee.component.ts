import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { FilterService } from '../../services/filter.service';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-mentee',
  templateUrl: './mentee.component.html',
  styleUrls: ['./mentee.component.scss'],
})
export class MenteeComponent implements OnInit {
  private errorMessage: string;
  private limit: number;

  requests: any;
  selectedSkillsId: any[] = [];
  selectedStatusesId: any[] = [];
  menteeFilters: any = {
    Primary: [],
    Status: [],
  };

  loading: boolean;
  @Input() currentPage;
  @Input() itemsPerPage;
  @Input() totalItems;

  constructor(
    private requestService: RequestService,
    private skillService: SkillService,
  ) {}

  ngOnInit() {
    this.getMenteeRequests(this.currentPage);
    this.getSkills();
    this.getStatus();
    this.loading = false;
  }

  /**
   * Gets 20 create-request belonging to a particular mentee from the Lenken API service
   *
   * @param {Number} page - the page number to view.
   */
  getMenteeRequests(page: number) {
    this.currentPage = page;
    this.loading = true;
    let params = {
      skills:this.selectedSkillsId,
      status:this.selectedStatusesId,
      mentee: true,
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

    this.getMenteeRequests(1);
  }
}
