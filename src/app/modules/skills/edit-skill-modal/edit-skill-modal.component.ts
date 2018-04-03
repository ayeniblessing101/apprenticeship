import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AlertService } from 'app/services/alert.service';
import { SkillService } from './../../../services/skill.service';

@Component({
  selector: 'app-edit-skill-modal',
  templateUrl: './edit-skill-modal.component.html',
  styleUrls: ['./edit-skill-modal.component.scss'],
})
export class EditSkillModalComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() skill: any;
  isApiCallInprogress = false;
  skillName: string;
  saveButtonText = this.isApiCallInprogress ? 'SAVING' : 'SAVE';
  isError: boolean;

  constructor(
        private alertService: AlertService,
        private skillService: SkillService,
       ) {
  }

  ngOnInit() {
    this.skillName = this.skill.name;
  }

  /**
   * It emits an event which initiates closing of
   * filters save modal
   *
   * @returns {void}
   */
  closeModal(event) {
    const targetId = event.target.id;
    const initiateModalClose = targetId === 'modal-container' || targetId === 'btn-modal-close';
    if (event && initiateModalClose) {
      this.close.emit();
    }
  }

  /**
   * Validates the name of a filter.
   *
   * @param {string} skillName - the name of the filter
   *
   * @returns {string}
   */
  validateSkillName(skillName): any {
    let status = true;
    let message = '';

    if (skillName === '') {
      status = false;
      message = 'Please enter a skill name.';
    } else if (skillName.length > 50) {
      status = false;
      message =
        'Please enter a skill name that is not greater than 50 characters.';
    }

    return { status, message };
  }

  /**
   * Displays a modal that shows an error message.
   *
   * @param {string} message - the error message to display.
   *
   * @returns {void}
   */
  showErrorMessage(message) {
    this.isError = true;
    this.alertService.showMessage(
        message,
        () => this.isError = false,
      );
  }

  /**
   * Save updated skill name by making an API call that saves the skill.
   *
   * @returns {void}
   */
  save() {
    const { status: isValidSkillName, message } = this.validateSkillName(this.skillName)
    if (!isValidSkillName) {
      this.skillName = this.skill.name;
      this.showErrorMessage(message);
      return;
    }
    this.isApiCallInprogress = true;
    this.saveButtonText = 'SAVING...';
    this.skillService.updateSkillName(this.skillName, this.skill.id)
        .toPromise()
        .then(() => {
          this.isApiCallInprogress = false;
          this.skill.name = this.skillName;
          this.close.emit(true);
          this.alertService.showMessage('Skill name updated successfully');
        })
        .catch((error) => {
          this.isApiCallInprogress = false;
          this.saveButtonText = 'SAVE';
          this.skillName = this.skill.name;
          this.showErrorMessage(error.message);
        });
  }
}
