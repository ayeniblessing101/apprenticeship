import { Component, OnInit, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { AlertService } from './../../../services/alert.service';
import { SkillService } from '../../../services/skill.service';

@Component({
  selector: 'app-add-skill-modal',
  templateUrl: './add-skill-modal.component.html',
  styleUrls: ['./add-skill-modal.component.scss'],
})
export class AddSkillModalComponent {
  @Output() closeSkillModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() newSkillAdded: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('addSkillModal') addSkillModal: ElementRef;

  skillName: string;

  constructor(private alertService: AlertService,
              private skillService: SkillService) {
  }

  /**
   * Emits an event that closes the add skill modal when the
   * discard button is clicked
   *
   * @memberof AddSkillModalComponent
   */
  closeAddSkillsModal() {
    this.closeSkillModal.emit();
  }

  /**
   * Picks up click events from the Host Listener to determine if
   * click was outside modal
   *
   */
  @HostListener('click')
  onClick() {
    if (!this.addSkillModal.nativeElement.contains(event.target)) {
      this.closeAddSkillsModal();
    }
  }

  /**
   * Makes a POST request that creates a new skill
   *
   * @memberof AddSkillModalComponent
   *
   * @returns {void}
   */
  saveSkill() {
    if (!isNaN(Number(this.skillName))) {
      return this.alertService.showMessage('Please enter a valid skill name.');
    }

    this.skillService.addSkill(this.skillName.trim())
      .toPromise()
      .then((response) => {
        this.newSkillAdded.emit(response);
        this.closeAddSkillsModal();
        this.alertService.showMessage('Skill has successfully been created.');
      })
      .catch((error) => {
        this.alertService.showMessage(error);
      });
  }
}
