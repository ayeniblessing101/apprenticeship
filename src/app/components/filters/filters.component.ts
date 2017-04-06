import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import { RequestService } from '../../services/request.service';
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
  closed = true;
  iconNames = ['add_box', 'remove_circle'];
  icon1Name = 'add_box';
  icon2Name = 'add_box';

  constructor(
    private skillService: SkillService,
    private requestService: RequestService
  ) { }

  toggleIcon(itemClickedIndex: Number) {
    this.closed = !this.closed;
    const index = this.closed === true ? 0 : 1;
    itemClickedIndex === 1 ? this.icon1Name = this.iconNames[index] : this.icon2Name = this.iconNames[index];
  }

  ngOnInit() {
    this.getSkillsNStatus();
  }

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
}
