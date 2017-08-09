import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MdDialog, MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { SkillService } from '../../../services/skill.service';
import { SkillDialogComponent } from '../../../components/skill-dialog/skill-dialog.component';
import { CancelRequestDialogComponent } from '../../cancelrequest/cancelrequest.component';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-skills',
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.scss'],
})
export class AdminSkillsComponent implements OnInit, OnDestroy {
  errorMessage: string;
  term: string;
  skills: any;
  skillSubscription: any;
  loading: boolean;

  constructor(
    private skillService: SkillService,
    private dialog: MdDialog,
    private snackbar: MdSnackBar,
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
        (skill) => {
          let isEditSkillAction = false;
          for (let i = 0; i < this.skills.length; i++) {
            if (this.skills[i].id === skill.id) {
              isEditSkillAction = true;
              this.skills[i].name = skill.name;
              break;
            }
          }

          if (!isEditSkillAction) this.skills.push(skill);
        });
  }

  deleteSkill(id) {
    const dialogRef = this.dialog.open(CancelRequestDialogComponent);

    dialogRef.afterClosed()
      .toPromise()
      .then((result) => {
        if (result) {
          this.skillService.deleteSkill(id)
            .toPromise()
            .then(() => {
              const snackbarConfig = new MdSnackBarConfig();
              snackbarConfig.duration = 2000;

              this.snackbar.open('Skill deleted', 'close', snackbarConfig)
                .afterDismissed()
                .toPromise()
                .then(() => {
                  // remove the deleted skill from the skills list
                  this.skills = this.skills.filter(skill => skill.id !== id);
                });
            });
        }
      });
  }
}
