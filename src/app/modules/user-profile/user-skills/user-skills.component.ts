import { Component, OnInit, Input } from '@angular/core';
import { SkillService } from '../../../services/skill.service';
import { AlertService } from '../../../services/alert.service';
import { FormControl, FormGroup } from '@angular/forms';

/**
 * @class UserSkillsComponent
 *
 * @implements {OnInit}
 */
@Component({
  selector: 'app-user-skills',
  templateUrl: './user-skills.component.html',
  styleUrls: ['./user-skills.component.scss'],
})
export class UserSkillsComponent implements OnInit {
  @Input() currentUser: any;
  skills: any;
  skillSubscription: any;
  form: FormGroup;
  error: string;
  skillControl: FormControl = new FormControl();

  constructor(
    private skillService: SkillService,
    public alertService: AlertService,
  ) { }

  ngOnInit() {
    this.sortUserSkills(this.currentUser.skills);
    this.skills = this.getSkills();
  }

  /**
   *  Get all skills
   *
   */
  getSkills() {
    this.skillService.getSkills({ includeTrashed: false })
      .toPromise()
      .then((skills) => {
        this.skills = skills;
      })
  }

  /**
   * Save User Skill
   *
   */
  saveSkill() {
    const skill = this.skillControl.value;

    if (skill != null && typeof skill === 'object') {
      this.skillService.addUserSkill(this.currentUser.id, skill.id)
        .toPromise()
        .then(() => {
          this.currentUser.skills.push(skill);
          this.sortUserSkills(this.currentUser.skills);
          this.skillControl.reset()
        },
      )
        .catch((error) => {
          this.skillControl.reset()
          return this.alertService.showMessage(error.message);
        });
    }
  }

  /**
   * Check if a value is an Object
   *
   * @param {any} value value to check
   *
   * @returns {Boolean}
   */
  isObject(value) { return typeof value === 'object'; }

  /**
   * Delete a user skill
   *
   * @param {number} id id of the skill
   */
  deleteUserSkill(skillId) {

    this.skillService.deleteUserSkill(this.currentUser.id, skillId)
      .toPromise()
      .then(() => {
        this.currentUser.skills = this.currentUser.skills.filter(
          (skill) => { return skill.id !== skillId; },
        );
      },
    )
      .catch((error) => {
        return this.alertService.showMessage(error.message);
      });
  }

  /**
   * Formats the autocomplete list
   *
   * @param {Object} skill skill object
   */
  autocompleListFormatter(skill) {
    return skill.name;
  }

  /**
   * Sorts the user skills into an alphabetical order
   *
   * @param {array} userSkills A list containing the user's skills
   *
   * @returns {array} Array containing the sorted user skills
   */
  sortUserSkills(userSkills) {
    return userSkills.sort((preceedingSkill, subsequentSkill) => {
      if (preceedingSkill.name.toLowerCase()
        < subsequentSkill.name.toLowerCase()) {
        return -1;
      }
      if (preceedingSkill.name.toLowerCase()
      > subsequentSkill.name.toLowerCase()) {
        return 1;
      }

      return 0;
    });
  }
}
