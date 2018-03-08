import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-skills-page',
  templateUrl: './skills-page.component.html',
  styleUrls: ['./skills-page.component.scss'],
})
export class SkillsPageComponent implements OnInit {
  skills: any;
  constructor(
     private route: ActivatedRoute,
  ) {
    this.route.data.subscribe((value) => {
      this.skills = value.skills;
    });
  }

  ngOnInit() {
    this.addLastRequestedPropertyToSkills();
    this.addRequestsPropertyToSkills()
  }

/**
  * It adds lastRequested property to each skill object.
  *
  * @returns {void}
  */
  addLastRequestedPropertyToSkills() {
    this.skills.forEach((skill) => {
      if (skill.request_skills.length === 0) {
        skill.last_requested = -1;
      } else {
        skill.last_requested = this.getLastRequestedSkill(skill.request_skills).created_at || null;
      }
    });
  }

/**
  * It gets the last rested skill.
  *
  * @param requestSkills the request skills.
  * @returns {void}
  */
  getLastRequestedSkill(requestSkills) {
    let lastRequestedSkill = requestSkills[0];

    requestSkills.forEach((requestSkill) => {
      if (requestSkill.type === 'primary') {
        if (moment(requestSkill.created_at).valueOf() > moment(lastRequestedSkill.created_at).valueOf()) {
          lastRequestedSkill = requestSkill;
        }
      }
    });
    return lastRequestedSkill;
  }

  /**
  * It adds requests property to each skill object.
  *
  * @returns {void}
  */
  addRequestsPropertyToSkills() {
    this.skills.forEach((skill) => {
      let numberOfRequests = 0;
      skill.request_skills.forEach((requestSkill) => {
        if (requestSkill.type === 'primary') {
          numberOfRequests = numberOfRequests + 1;
        }
      });
      skill.number_of_requests = numberOfRequests;
    });
  }
}
