import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { SkillService } from '../../services/skill.service';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import * as moment from 'moment';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})

export class RequestsComponent implements OnInit {
  checked = false;
  indeterminate = false;
  align = 'start';
  disabled = false;
  form: FormGroup;
  lengthOfMentorship: Array<Number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  daysOfAvailability: Array<String> = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  timeSlots: Array<string> = [];
  numMonths: Array<any>;
  days: Array<any>;
  skills: Array<string> = [];
  selection: Array<string>;

  logSingleString = '';
  logMultipleString = '';
  snackBarConfig: any;

  constructor(
    private requestService: RequestService,
    private router: Router,
    private snackbar: MdSnackBar,
    private skillService: SkillService
  ) {
    this.snackBarConfig = { duration: 3000 };
  }

  ngOnInit() {
    this.form = new FormGroup({
      requiredSkills: new FormControl('', [Validators.required]),
      otherSkills: new FormControl(''),
      duration: new FormControl('', [Validators.required]),
      timeControlStart: new FormControl('', [Validators.required]),
      timeControlEnd: new FormControl('', [Validators.required]),
      timeZone: new FormControl('', [Validators.required]),
      selectedDays: new FormArray(this.daysOfAvailability
        .map(() => new FormControl(false)), this.validateSelectedDays),
      description: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required])
    });
    this.fetchSkills();
    this.initMonths();
    this.setDays();
    this.timeSlots = this.getTimeSlots(this.timeSlots);
  }

  /**
   * Maps the length of mentorship array to be used in the select input field
   * for duration of mentorship
   * @return {Object} number of months
   */
  initMonths() {
    this.numMonths = this.lengthOfMentorship.map((item) => ({
      'label' : item,
      'value' : item
    }));
  }

  /**
   * Maps the days of the week array to be used in the days available
   * select input field
   * @return {Object} days of the week
   */
  setDays() {
    this.days = this.daysOfAvailability.map((item) => ({
      'label' : item,
      'value' : item
    }));
  }

  /**
   * Gets the list of skills from the server
   * @return {void}
   */
  fetchSkills() {
    this.skillService
      .getSkills()
      .subscribe(res => this.setSkills(res));
  }

  /**
   * Maps the returned skills list to be used in the select skills input field
   * select input field
   * @param {Array} skills Array of object to be mapped
   * @return {Object} list of skills
   */
  setSkills(skills) {
    this.skills = skills.map(skill => ({
      'label' : skill.name,
      'value' : skill.id
    }));
  }

  /**
   * Validates the selected days input field
   *
   * @param {Object} selectedDays The form selectedDays array object to be validated
   *
   * @return {Object|Boolean} the validity of the field
   */
  validateSelectedDays(selectedDays: FormArray): any {
    return selectedDays.value.indexOf(true) !== -1 ? null : {
      selectedDays: {
        valid: false
      }
    };
  }

  onSingleOpened() {
    this.logSingle('- opened');
  }

  onSingleClosed() {
    this.logSingle('- closed');
  }

  onSingleSelected(item) {
    this.logSingle(`- selected (value: ${item.value}, label: ${item.label}`);
  }

  onSingleDeselected(item) {
    this.logSingle(`- deselected (value: ${item.value}, label: ${item.label}`);
  }
  onMultipleOpened() {
    this.logMultiple('- opened');
  }

  onMultipleClosed() {
    this.logMultiple('- closed');
  }

  onMultipleSelected(item) {
    this.logMultiple(`- selected (value: ${item.value}, label: ${item.label}`);
  }

  onMultipleDeselected(item) {
    this.logMultiple(`- deselected (value: ${item.value}, label: ${item.label}`);
  }

  private logMultiple(msg: string) {
    this.logMultipleString += `${msg} \n`;
  }

  private logSingle(msg: string) {
    this.logSingleString += `${msg} \n`;
  }

  /**
   * Takes the form values and makes POST request to the requests endpoint
   * to create a new request.
   * @param form
   * @return {void}
   */
  requestMentor(form) {
    const data = form.value;
    form.value.selectedDays = form.value.selectedDays
      .map((day, index) => day === true ? this.daysOfAvailability[index] : false)
      .filter(day => day !== false);

    return this.requestService.requestMentor(data)
      .toPromise()
      .then(() => this.snackBarOpen(true))
      .catch(err => this.snackBarOpen(false));
  }

  private snackBarOpen(status: Boolean) {
    if (!status) {
      return this.snackbar
        .open('Invalid Request!', 'close', this.snackBarConfig);
    }

    this.snackbar
      .open('Request successful', 'close', this.snackBarConfig)
      .afterDismissed()
      .subscribe(() => {
        this.router.navigate(['/dashboard'], { queryParams: { refresh: 'dashboard'}});
      });
  }

  /**
   * Curate a selection of time slots for the start and end time select boxes
   *
   * @param {Array} timeSlots the initial collection of time slots
   *
   * @return {Array} timeSlots the fully seeded collection of timeslots
   */
  private getTimeSlots(timeSlots: Array<string>) {
    // for some reason this class is called twice, let's avoid time slot dupes
    const totalTimeSteps = 48;

    if (timeSlots.length < totalTimeSteps) {
      let currentTime = moment().startOf('day');

      for (let i = 1; i <= totalTimeSteps; i++) {
        timeSlots.push(currentTime.format('HH:mm'));
        currentTime.add(30, 'm'); // time intervals of 30mins each
      }
    }

    return timeSlots;
  }
}
