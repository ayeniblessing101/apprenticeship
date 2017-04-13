import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import { RequestService } from '../../services/request.service';
import { FilterService }     from '../../services/filter.service';
import { AccordionModule } from 'ngx-accordion';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class FiltersComponent implements OnInit {
  errorMessage: string;
  skills: any;
  status: any;
  iconNames = ['expand_more', 'expand_less'];
  icon1Name = 'expand_more';
  icon2Name = 'expand_more';

  constructor(
    private skillService: SkillService,
    private requestService: RequestService,
    private filterService: FilterService
  ) { }

  /**
  *  toggleIcon
  *
  *  toggles the state of the caret on the filter options
  *
  *  @param Integer itemClickedIndex
  */
  toggleIcon(itemClickedIndex: Number) {
    if (itemClickedIndex === 1) {
      this.icon1Name = this.icon1Name === 'expand_more' ? 'expand_less' : 'expand_more';
    } else if (itemClickedIndex === 2) {
      this.icon2Name = this.icon2Name === 'expand_more' ? 'expand_less' : 'expand_more';
    }
  }

  ngOnInit() {
    this.getSkillsNStatus();
  }

  /**
  *  getSkillsNStatus
  *
  *  gets skills and statuses from the Lenken API service
  */
  getSkillsNStatus() {
    this.skillService.getSkills()
      .subscribe(
        skills => this.skills = skills,
        error => this.errorMessage = <any>error
      );
    this.requestService.getStatus()
      .subscribe(
        status => this.status = status,
        error => this.errorMessage = <any>error
      );
  }

  /**
  *  toggleSkill
  *
  *  helper method that adds or removes a skill from the checkedSkills array in the filters service
  *
  *  @param String skill
  */
  toggleSkill(skill) {
    this.filterService.toggleSkill(skill);
  }

  /**
  *  toggleStatus
  *
  *  helper method that adds or removes a status from the checkedStatuses array in the filters service
  *
  *  @param String status
  */
  toggleStatus(status) {
    this.filterService.toggleStatus((status).toLowerCase());
  }
}
