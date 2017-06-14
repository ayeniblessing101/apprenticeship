import { Component } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-create-skill',
  templateUrl: 'create-skill-dialog.component.html',
  styleUrls: ['create-skill-dialog.component.scss']
})
export class CreateSkillDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MdDialogRef<any>,
    private snackBar: MdSnackBar,
    private skillService: SkillService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  /**
   * Creates a new skill
   *
   * @param {Object} form
   */
  createSkill(form) {
    this.skillService
      .createSkill(form.value)
      .subscribe(
        value => this.snackBarOpen(true),
        error => this.snackBarOpen(false)
      );
  }

  /**
   * A snackbar to show result of the create skill action
   *
   * @param {Boolean} status - indicates if the request was successful or not
   */
  private snackBarOpen(status) {
    const config = { duration: 3000 };

    if (!status) {
      return this.snackBar
        .open('Skill already exists!', 'close', config);
    }

    this.snackBar
      .open('Skill created successfully', 'close', config)
      .afterDismissed()
      .subscribe(() => {
        this.dialogRef.close(true);
        location.reload();
      });
  }
}
