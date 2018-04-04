import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SortingHelper } from '../../../helpers/sorting.helper';
import { AlertService } from 'app/services/alert.service';
import { SkillService } from './../../../services/skill.service';

@Component({
  selector: 'app-skill-records',
  templateUrl: './skill-records.component.html',
  styleUrls: ['./skill-records.component.scss'],
})
export class SkillRecordsComponent {
  @Input() skills: any[];
  rerender: boolean;
  showSkillDetails = false;
  toggleStatus: boolean;
  activeSortCategory = null;
  lastSortedCategory: string;
  isEditSkillModalOpen: boolean;
  skillToUpdate: any;
  skill

  sortCategoryValues = {
    name: 'asc',
    active: 'asc',
    number_of_requests: 'asc',
    last_requested: 'asc',
  }

  constructor(
     private sortingHelper: SortingHelper,
     private changeDetector: ChangeDetectorRef,
     private skillService: SkillService,
     private alertService: AlertService,
     private router: Router,
  ) {}

/**
  * Redirects to skill details page when condition is true
  *
  * @param {string} skill The selected skill
  *
  * @returns {void}
  */
  handleSkillClick(skill) {
    if (!this.isEditSkillModalOpen && !this.toggleStatus) {
      return this.router.navigate(['/admin/skills/', skill.id]);
    }
  }

/**
  * It sorts skills base on the skills headers.
  *
  * @param {string} headerName The name of the skill header to be sorted by skills.
  * @param {boolean} headerIsDateType Determines waether to sort using date.
  *
  * @returns {void}
  */
  sortSkills(headerName, headerIsDateType = false) {
    let sortingOrder = this.sortCategoryValues[headerName];

    if (this.activeSortCategory === headerName) {
      sortingOrder = this.sortCategoryValues[headerName] === 'asc' ? 'desc' : 'asc';
    }

    this.sortingHelper.sortRequestsByHeader(
      this.skills, headerName, headerIsDateType, sortingOrder,
    );

    this.sortCategoryValues[headerName] = sortingOrder;
    this.activeSortCategory = headerName;
    this.rerender = true;
    this.changeDetector.detectChanges();
    this.rerender = false;
  }

/**
  * It opens the modal that enable admin to edit a skill
  *
  * @param {string} skill The skill to edit.
  *
  * @returns {void}
  */
  openEditSkillModal(skill) {
    this.isEditSkillModalOpen = true;
    this.skillToUpdate = skill;
  }

/**
  * It closes the edit skill modal.
  *
  * @param {boolean} event It determines sorting of skills after skill has been updated.
  *
  * @returns {void}
  */
  closeEditSkillModal(event) {
    if (event && this.activeSortCategory === 'name') {
      this.sortCategoryValues.name = this.sortCategoryValues.name === 'asc' ? 'desc' : 'asc';
      this.sortSkills('name');
    }

    this.isEditSkillModalOpen = false;
    this.toggleStatus = false;
  }

/**
  * It enables a skill if the skill selected is disabled or disabled it
  * if it is enabled.
  *
  * @param {Object} skill The skill whose status is to be updated.
  *
  * @returns {void}
  */
  toggleSkillStatus(skill) {
    this.toggleStatus = true;
    this.alertService
      .confirm(
        `Are you sure want to  ${skill.deleted_at ? 'enable' : 'disable'} ${skill.name} skill`,
        this, {
          confirmActionText: ` ${skill.deleted_at ? 'ENABLE' : 'DISABLE'}`,
          abortActionText: 'CANCEL',
          confirmAction: () => {
            if (skill.deleted_at) {
              this.updateSkillStatus(skill, 'active')
            } else {
              this.updateSkillStatus(skill, 'inactive');
            }
          },
        });
  }

/**
  * It triggers an API call that updates the skill status.
  *
  * @param {Object} skill The skill whose status is to be updated.
  * @param {status} status The action to be performed on the skill. `0` to disable
  * `1` to enable
  *
  * @returns {void}
  */
  updateSkillStatus(skill, status) {
    this.skillService.updateSkillStatus(skill.id, status)
        .toPromise()
        .then((res) => {
          this.alertService.showMessage(`${skill.name} skill has been ${skill.deleted_at ? 'enabled' : 'disabled'} successfully`);
          skill.deleted_at = status === '0' ? new Date() : null;
        })
        .catch((error) => {
          this.alertService.showMessage(error.message);
        });
  }
}
