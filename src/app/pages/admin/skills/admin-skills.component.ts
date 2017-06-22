import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MdDialog } from '@angular/material';

import { SkillService } from '../../../services/skill.service';
import { SkillDialogComponent } from '../../../components/skill-dialog/skill-dialog.component';

@Component({
  selector: 'app-skills',
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.scss'],
})
export class AdminSkillsComponent implements OnInit, OnDestroy {
  errorMessage: string;
  skills: any;
  skillSubscription: any;
  loading: boolean;

  constructor(
    private skillService: SkillService,
    private dialog: MdDialog,
  ) {
    this.loading = false;
  }

  ngOnInit() {
    this.getSkills();
  }

  ngOnDestroy() {
    this.skillSubscription.unsubscribe();
  }

  /**
  * gets all skills from skill service
  *
  * @return {Void}
  */
  getSkills(): void {
    this.loading = true;
    this.skillSubscription = this.skillService.getSkills()
      .subscribe(
        (skills) => {
          this.loading = false;
          this.skills = skills;
        },
        error => this.errorMessage = error,
      );
  }

  /**
   * open dialog to create or edit a skill
   */
  openSkillModal(skill = false) {
    this.dialog.open(SkillDialogComponent, { data: skill })
      .afterClosed().subscribe(
        (result) => {
          this.getSkills();
        });
  }
}
