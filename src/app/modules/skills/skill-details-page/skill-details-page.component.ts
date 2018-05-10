import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skill-details-page',
  templateUrl: './skill-details-page.component.html',
  styleUrls: ['./skill-details-page.component.scss'],
})
export class SkillDetailsPageComponent {
  skillId;
  isViewAllMentorsEnabled = false;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((value) => {
      this.skillId = value.get('id');
    });
  }

  /**
   * Activates or deactivates the view all mentors button if there are
   * skill requests
   *
   * @param skillRequestCount - the count of skill requests from the child
   *
   * @returns {void}
   */
  toggleViewAllMentorsButton(skillRequestCount) {
    this.isViewAllMentorsEnabled = skillRequestCount > 0;
  }
}
