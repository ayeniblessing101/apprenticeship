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
  loadingRequests = false;
  skillName: string;
  scale = 5;

  constructor(
    private skillService: SkillService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadingRequests = true;
    this.skillService.getSkillTopMentors(this.skillId)
    .toPromise()
    .then((response) => {
      if (!response.mentors.length) {
        this.loadingRequests = false;
      } else {
        this.skillName = response.skillName;
        this.skillMentors = response.mentors;
        this.loadingRequests = false;
      }
    })
    .catch((error) => {
      this.loadingRequests = false;
    });
  }

  navigateToMentorsPage() {
    this.router.navigate([`admin/skills/${this.skillId}/mentors`]);
  }
}
