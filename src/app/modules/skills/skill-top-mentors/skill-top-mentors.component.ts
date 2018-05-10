import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SkillService } from '../../../services/skill.service';
@Component({
  selector: 'app-skill-top-mentors',
  templateUrl: './skill-top-mentors.component.html',
  styleUrls: ['./skill-top-mentors.component.scss'],
})
export class SkillTopMentorsComponent implements OnInit {
  skillMentors= [];
  @Input() skillId;
  @Input() isViewAllMentorsEnabled: boolean;
  loadingRequests = false;
  skillName: string;
  scale = 5;

  constructor(
    private skillService: SkillService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getSkillTopMentors();
  }

 /**
   * Get skill top mentors
   *
   * @return {void}
   */
  getSkillTopMentors() {
    this.loadingRequests = true;
    this.skillService.getSkillTopMentors(this.skillId)
      .toPromise()
      .then((response) => {
        this.skillName = response.skill.name;
        this.skillMentors = response.skill.mentors;
        this.loadingRequests = false;
      })
      .catch(() => {
        this.loadingRequests = false;
      });
  }

  navigateToMentorsPage() {
    this.router.navigate([`admin/skills/${this.skillId}/mentors`]);
  }
}
