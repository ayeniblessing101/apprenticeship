import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component } from '@angular/core';
@Component({
  selector: 'app-skill-details-page',
  templateUrl: './skill-details-page.component.html',
  styleUrls: ['./skill-details-page.component.scss'],
})
export class SkillDetailsPageComponent {
  skillId;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((value) => {
      this.skillId = value.get('id');
    });
  }
}
