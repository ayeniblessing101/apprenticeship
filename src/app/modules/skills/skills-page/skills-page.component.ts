import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SearchService } from '../../../services/search.service';
import * as moment from 'moment';

@Component({
  selector: 'app-skills-page',
  templateUrl: './skills-page.component.html',
  styleUrls: ['./skills-page.component.scss'],
})
export class SkillsPageComponent implements OnInit, OnDestroy {
  skills: any;
  addSkillModal: boolean;
  noResultMessage: string;
  private subscription: Subscription;


  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
  ) {
    this.route.data.subscribe((value) => {
      this.skills = value.skills;
    });
  }

  ngOnInit() {
    this.addLastRequestedPropertyToSkills(this.skills);
    this.addRequestsPropertyToSkills(this.skills);
    this.initiateSearchSubscription();

  }

  ngOnDestroy() {
    if (this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
    * It adds lastRequested property to each skill object.
    *
    * @param {array} skills array of objects
    *
    * @returns {void}
    */
  addLastRequestedPropertyToSkills(skills) {
    skills.forEach((skill) => {
      if (skill.request_skills.length === 0) {
        skill.last_requested = -1;
      } else {
        skill.last_requested = this.getLastRequestedSkill(skill.request_skills).created_at || null;
      }
    });
  }

 /**
   * Calls searchService that does a search based on the search term
   *
   * @return {void}
   */
  initiateSearchSubscription() {
    this.searchService.searchTerm.subscribe(
        (currentSearchTerm) => {
          this.searchService.fetchRecords('v2/skills', currentSearchTerm)
            .toPromise()
            .then((response) => {
              this.skills = response;
            });
          this.noResultMessage = `Your search didn't return any results. Try something different.`;
        });
  }

  /**
   *  Add the new skill to the skills' pool
   *
   * @param {object} newSkill response object from child component
   *
   * @memberof SkillsPageComponent
   */
  addNewSkillToPool(newSkill) {
    newSkill.deleted_at = null;
    newSkill.request_skills = [];
    this.skills.unshift(newSkill);
    this.addLastRequestedPropertyToSkills(this.skills);
    this.addRequestsPropertyToSkills(this.skills);
  }
  /**
   * It displays the add skill modal.
   *
   * @memberof SkillsPageComponent
   *
   * @returns {void}
   */
  toggleAddSkillModal() {
    this.addSkillModal = !this.addSkillModal;
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
  * @param {array} skills
  * @returns {void}
  */
  addRequestsPropertyToSkills(skills) {
    skills.forEach((skill) => {
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
