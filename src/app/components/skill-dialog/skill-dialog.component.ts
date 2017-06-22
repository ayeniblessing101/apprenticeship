import { Component, Inject, Optional } from '@angular/core';
import { MdDialogRef, MdSnackBar, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-create-skill',
  templateUrl: 'skill-dialog.component.html',
  styleUrls: ['skill-dialog.component.scss'],
})
export class SkillDialogComponent {
  form: FormGroup;
  loading: boolean;

  constructor(
    public dialogRef: MdDialogRef<any>,
    private snackBar: MdSnackBar,
    private skillService: SkillService,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MD_DIALOG_DATA) public skill: any,
  ) {
    const skillName = skill ? skill.name : '';
    this.form = this.formBuilder.group({
      name: [skillName, Validators.required],
    });
    this.loading = false;
  }

  /**
   * Creates a new skill
   *
   * @param {Object} form - submitted form object
   */
  createSkill(form) {
    this.loading = true;
    this.skillService
      .createSkill(form.value)
      .toPromise()
      .then(
        (value) => {
          this.snackBarOpen(true, value);
          this.loading = false;
        },
      )
      .catch(
        (error) => {
          this.snackBarOpen(false, error);
          this.loading = false;
        },
      )
  }

  /**
   * Edits an existing skill
   *
   * @param {Object} form - submitted form object
   */
  editSkill(form) {
    this.loading = true;
    this.skillService
      .editSkill(this.skill.id, form.value)
      .toPromise()
      .then(
        (value) => {
          this.snackBarOpen(true, value);
          this.loading = false;
        },
      )
      .catch(
        (error) => {
          this.snackBarOpen(false, error);
          this.loading = false;
        },
      )
  }

  /**
   * A snackbar to show result of the create or edit skill action
   *
   * @param {Boolean} status - indicates if the request was successful or not
   */
  private snackBarOpen(status, value) {
    const config = { duration: 3000 };

    if (!status) {
      return this.snackBar
        .open(value.message, 'close', config);
    }

    this.snackBar
      .open(value.message, 'close', config)
      .afterDismissed()
      .toPromise().then(() => {
        this.dialogRef.close(true);
      });
  }
}
