import { Component, OnInit, OnDestroy } from '@angular/core';
import { SkillService } from '../../../services/skill.service';

@Component({
  selector: 'app-skills',
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.scss'],
})
export class AdminSkillsComponent implements OnInit, OnDestroy {
  errorMessage: string;
  skills: any;
  skillSubscription: any;

  constructor(
    private skillService: SkillService
  ) {
  }

  ngOnInit() {
    this.getSkills();
  }

  ngOnDestroy() {
    this.skillSubscription.unsubscribe();
  }

  /**
  * gets all skills from skill service
  *
  * @return {Void}
  */
  getSkills(): void {
    this.skillSubscription = this.skillService.getSkills()
      .subscribe(
        skills => this.skills = skills,
        error => this.errorMessage = error
      );
  }
}
