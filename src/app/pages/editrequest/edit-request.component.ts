import {Component, OnInit, Input, Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/toPromise';

import { RequestService } from '../../services/request.service';
import { SkillService } from '../../services/skill.service';
import { RequestsComponent } from '../requests/requests.component';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: 'edit-request.component.html',
  styleUrls: ['../requests/requests.component.scss', 'edit-request.component.scss'],
})
export class EditDialogComponent extends RequestsComponent implements OnInit {
  editRequestForm: FormGroup;
  requestId;
  details;

  constructor(
    private dialogRef: MdDialogRef<any>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private editRequestService: RequestService,
    private editRouter: Router,
    private mdSnackbar: MdSnackBar,
    private editSkillService: SkillService,
    @Inject(MD_DIALOG_DATA) private data: any
  ) {
    super(
      editRequestService,
      editRouter,
      mdSnackbar,
      editSkillService
    );
    this.requestId = this.data.id;
  }

  ngOnInit() {
    const requiredSkills = [];
    const secondarySkills = [];
    this.initMonths();
    this.setDays();

    this.editSkillService
      .getSkills()
      .toPromise()
      .then((skills) => {
        this.setSkills(skills);
        this.details = this.data.details;

        this.details.request_skills.forEach((skill) => {
          skill.type === 'primary' ?
          requiredSkills.push(skill.id) : secondarySkills.push(skill.id);
        });

        this.createForm(this.details, requiredSkills, secondarySkills);
      });
  }

  /**
   * edits mentorship request
   *
   * @param {Object} form
   */
  editRequest(form) {
    const data = this.formatFormData(form.value, this.daysOfAvailability);
    const config = new MdSnackBarConfig();
    config.duration = 1500;

    this.editRequestService.updateRequestStatus(this.requestId, data)
      .toPromise()
      .then(() => this.mdSnackbar
        .open('Update successful', 'close', config)
        .afterDismissed()
        .subscribe(() => {
          this.dialogRef.close(true);
          location.reload();
      }))
      .catch(error => this.mdSnackbar.open('Invalid Request', 'close', config));
  }

  /**
   * formats form data to what the update endpoint expects
   *
   * @param {Object} data - data to be formatted
   * @param {Array} days - Available days to choose from
   *
   * @return {Object} formatted data
   */
  formatFormData(data, days) {
    data.selectedDays = data.selectedDays
      .map((day, index) => day === true ? days[index] : false)
      .filter(day => day !== false);
    data.duration =  data.duration[0] || data.duration;
    data.pairing = {
      start_time: data.timeControlStart,
      end_time: data.timeControlEnd,
      timezone: data.timeZone,
      days: data.selectedDays,
    };

    return data;
  }

  /**
   * creates form group and populates it with request's details
   *
   * @param {Object} data - request's details
   * @param {Array} requiredSkills - request's primary skills
   * @param {Array} secondarySkills - request's secondary skills
   */
  createForm(data, requiredSkills, secondarySkills) {
    this.editRequestForm = this.formBuilder.group({
      primary: [requiredSkills, [Validators.required]],
      secondary: [secondarySkills],
      duration: [[data.duration], [Validators.required]],
      timeControlStart: [data.pairing.start_time, [Validators.required]],
      timeControlEnd: [data.pairing.end_time, [Validators.required]],
      timeZone: [data.pairing.timezone, [Validators.required]],
      selectedDays: new FormArray(this.daysOfAvailability
        .map((day) => {
          if (data.pairing.days.includes(day)) {
            return new FormControl(true);
          }
          return new FormControl(false);
        }), this.validateSelectedDays),
      description: [data.description, [Validators.required]],
      title: [data.title, [Validators.required]]
    });
  }
}
