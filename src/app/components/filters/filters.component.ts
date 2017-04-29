import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SkillService } from '../../services/skill.service';
import { RequestService } from '../../services/request.service';
import { FilterService } from '../../services/filter.service';
import { AccordionModule } from 'ngx-accordion';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class FiltersComponent implements OnInit {
  @Input() autoFilterStatus;
  userId: string;
  currentPage: string;
  errorMessage: string;
  skills: any;
  status: any;
  dateRange: any;
  dateRangeMap: any[];
  iconNames = ['expand_more', 'expand_less'];
  icon1Name = 'expand_more';
  icon2Name = 'expand_less';
  icon3Name = 'expand_more';

  constructor(
    private skillService: SkillService,
    private requestService: RequestService,
    private filterService: FilterService,
    private router: Router,
    private auth: AuthService
  ) {
    this.dateRange = {
      'Last day': 1,
      'Last 7 days': 7,
      'Last 14 days': 14,
      'Last month': 30,
      'All time': 0
    };
    this.dateRangeMap = Object.keys(this.dateRange);
    this.userId = this.auth.userInfo.id;
  }

  /**
  * toggleIcon
  *
  * toggles the state of the caret on the filter options
  *
  * @param Integer itemClickedIndex
  */
  toggleIcon(itemClickedIndex: Number) {
    if (itemClickedIndex === 1) {
      this.icon1Name = this.icon1Name === 'expand_more' ? 'expand_less' : 'expand_more';
    } else if (itemClickedIndex === 2) {
      this.icon2Name = this.icon2Name === 'expand_more' ? 'expand_less' : 'expand_more';
    } else if (itemClickedIndex === 3) {
      this.icon3Name = this.icon3Name === 'expand_more' ? 'expand_less' : 'expand_more';
    }
  }

  ngOnInit() {
    this.currentPage = this.router.url.slice(1);
    this.getSkillsNStatus();
  }

  /**
  * getSkillsNStatus
  *
  * gets skills and statuses from the Lenken API service
  */
  getSkillsNStatus() {
    if (this.currentPage === 'mentor') {
      this.skillService.getUserSkills(this.userId)
        .subscribe(
          skills => this.skills = skills,
          error => this.errorMessage = <any>error
        );
    } else {
      this.skillService.getSkills()
        .subscribe(
          skills => this.skills = skills,
          error => this.errorMessage = <any>error
        );
    }
    this.requestService.getStatus()
      .subscribe(
        status => {
        this.status = status;
        if (this.currentPage === 'mentor') {
          this.status = this.status.filter((item) => {
            return item !== 'Closed';
          });
        }
      },
        error => this.errorMessage = <any>error
      );
  }

  /**
  * toggleSkill
  *
  * helper method that adds or removes a skill from the checkedSkills array in the filters service
  *
  * @param String skill
  */
  toggleSkill(skill) {
    this.filterService.toggleSkill(skill);
  }

  /**
  * toggleStatus
  *
  * helper method that adds or removes a status from the checkedStatuses array in the filters service
  *
  * @param String status
  */
  toggleStatus(status) {
    this.filterService.toggleStatus((status).toLowerCase());
  }

  /**
   * setDateRange
   *
   * helper method assigns a value to the selectedDateRange attribute in the filters service
   *
   * @param {number} value
   *
   * @memberOf FiltersComponent
   */
  setDateRange(value) {
    this.filterService.setDateRange(value);
  }
}
