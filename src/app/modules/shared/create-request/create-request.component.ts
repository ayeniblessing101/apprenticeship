import { Component, EventEmitter, OnInit, Input, Output, HostListener, ViewChild, ElementRef } from '@angular/core';
import { SkillService } from '../../../services/skill.service';
import { RequestService } from '../../../services/request.service';
import { UserService } from '../../../services/user.service';
import { Skill } from '../../../interfaces/skill.interface';
import { PairingDay } from '../../../interfaces/pairing-day.interface';
import { AlertService } from '../../../services/alert.service';
import * as moment from 'moment';
import { ConfirmationAlertConfiguration } from '../../../interfaces/confirmation-alert-configuration.interface';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss'],
})

export class CreateRequestComponent implements OnInit {
  @Input() requestType;

  @ViewChild('createRequestModal') createRequestModal: ElementRef;

  @Output() closeCreateRequestModal = new EventEmitter<boolean>();
  @Output() showRequestModal = new EventEmitter<string>();
  @Output() closeMentorshipModal = new EventEmitter<boolean>();

  skills: any[] = [];
  skillNames: string[] = [];
  basicSkills: Skill[] = [];
  complementarySkills: Skill[] = [];
  requestSkills: string[] = [];
  allTimeZones: string[] = ['WAT', 'EAT', 'CAT', 'EST', 'PST'];
  selectedTimeZone: string;
  durationOfMonths: number;

  timeSlots: string[] = [];
  selectedDays: string[];
  timeSelected: string;

  daysOfAvailability: PairingDay[];
  lengthOfMentorship: number[];
  numberOfMonths: number;
  durationTime: any;
  duration: string;
  sessionDuration: string;
  startTime: string;
  currentUser: any;
  displayedSessionDuration: string;
  title: string;
  isAllDaysChecked: boolean;

  complementarySkillsPlaceholder: string;
  primarySkillsPlaceholder: string;
  isEmptyBasicSkills: boolean;
  readonly maxLength: number = 140;
  readonly radius: number = 8;
  charactersLeft: number;
  strokeDashOffset: number;
  isCharacterLimitClose: boolean;
  isStrokeDashOffsetLimitClose: boolean;
  isStrokeDashOffsetEqualZero: boolean;

  constructor(private skillService: SkillService,
              private requestService: RequestService,
              private alertService: AlertService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.daysOfAvailability = [
      {name: 'Mon', value: 'monday', checked: false},
      {name: 'Tue', value: 'tuesday', checked: false},
      {name: 'Wed', value: 'wednesday', checked: false},
      {name: 'Thur', value: 'thursday', checked: false},
      {name: 'Fri', value: 'friday', checked: false},
    ];

    this.lengthOfMentorship = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.fetchSkills();
    this.getTimeSlots();
    this.currentUser = this.userService.getCurrentUser();
    this.duration = '01:30';
    this.sessionDuration = this.addHrsMinsStrings(this.duration);
    this.duration = this.sessionDuration;
    this.durationTime = moment(this.sessionDuration);

    this.displayedSessionDuration = this.addHrsMinsStrings(this.duration);

    this.title = this.requestType;
    this.selectedTimeZone = this.allTimeZones[0];
    this.startTime = this.timeSlots[0];
    this.durationOfMonths = this.lengthOfMentorship[0];

    this.complementarySkillsPlaceholder = `Enter 3 prerequisite skills the ${this.title} MAY have`;
    this.primarySkillsPlaceholder = `Enter 3 prerequisite skills the ${this.title} MUST have`;

    this.isAllDaysChecked = false;

    this.strokeDashOffset =  (2 * Math.PI * this.radius);
  }

  /**
   * Formats the displayed Session Duration time by adding the strings
   * 'hr' and 'mins' to the time.
   *
   * @param {string} time
   * @return {string} formattedSessionDuration
   */
  addHrsMinsStrings(time: string): string {
    let formattedSessionDuration = time.replace(':', 'hr ');
    formattedSessionDuration = formattedSessionDuration + 'mins';
    if (formattedSessionDuration[0] === '0') {
      formattedSessionDuration = formattedSessionDuration.substr(1);
    }
    return formattedSessionDuration;
  }

  /**
   * Formats the displayed Session Duration time by removing the string 'mins' and
   * replacing the string 'hrs' with ':'
   *
   * @param {string} time
   * @return {string}
   */
  removeHrsMinsStrings(time: string): string {
    let formattedSessionDuration = time.replace('hr ', ':');
    formattedSessionDuration = formattedSessionDuration.replace('mins', '');
    if (formattedSessionDuration[1] === ':') {
      formattedSessionDuration = '0' + formattedSessionDuration;
    }
    return formattedSessionDuration;
  }

  /**
   * Picks up click events from the Host Listener to determine if
   * click was outside modal
   *
   * @param event
   */
  @HostListener('click', ['$event'])
  onClick(event) {
    if (event.path[1].localName === 'app-create-request') {
      this.closeCreateRequest();
    }
  }

  /**
   * Closes the create request modal
   *
   * @returns {void}
   */
  closeCreateRequest() {
    this.closeCreateRequestModal.emit();
  }

  /**
   * Takes the form values and makes POST request to the create-request endpoint
   * to create a new mentorship request.
   *
   * @param {Object} form input
   *
   * @returns {Object}
   */
  onSubmit(form) {
    if (this.validateSessionDuration(this.duration) === false) {
      return this.alertService.showMessage(
        '0hr 00mins is an invalid session duration',
      );
    }
    ;

    const selectedDays = this.getSelectedDays();

    if (selectedDays.length === 0 || this.basicSkills.length === 0) {
      return this.alertService.showMessage(
        'Please fill in the compulsory fields to complete your request',
      );
    } else if (form.value.neededSkill.trim() === '' || form.value.description.trim() === '') {
      return this.alertService.showMessage(
        'Please fill in the compulsory fields to complete your request',
      );
    }

    if (!form.valid) {

      return this.alertService.showMessage('Please fill in the compulsory fields to complete your request');
    } else {
      let isMentor = false;
      if (this.requestType === 'mentee') {
        isMentor = true;
      }

      const basicSkillIds = this.basicSkills.map(skill => skill.id);
      const complementarySkillIds = this.complementarySkills.map(skill => skill.id);
      const sessionEndTime = this.calculateSessionEndTime(this.startTime,
        this.removeHrsMinsStrings(this.duration));
      const requestDetails = {
        isMentor,
        title: form.value.neededSkill,
        description: form.value.description,
        primary: basicSkillIds,
        secondary: complementarySkillIds,
        duration: this.durationOfMonths,
        location: this.currentUser ? this.currentUser.location : '',
        pairing: {
          start_time: this.startTime,
          end_time: sessionEndTime,
          days: selectedDays,
          timezone: this.selectedTimeZone,
        },
      };

      return this.requestService.createRequest(requestDetails)
        .toPromise()
        .then((response) => {
          this.requestService.requestPool.next();
          this.showCreatedRequestConfirmation(response);
        })
        .catch((error) => {
          return this.alertService.showMessage(error.title[0]);
        });
    }
  }

  /**
   * It emits an event that shows the modal that displays the details of
   * the created request.
   *
   * @param {Object} request the request to emit
   *
   * @returns {Object}
   */
  showCreatedRequestConfirmation(request) {
    const alertServiceConfig: ConfirmationAlertConfiguration = {
      abortActionText: 'CLOSE',
      confirmActionText: 'VIEW',
      confirmAction: () => {
        this.showRequestModal.emit(request);
        this.closeCreateRequest();
      },
      afterClose: () => {
        this.closeCreateRequest();
      },
      canDisable: false,
    };

    return this.alertService.confirm('Your request was successfully created.', this, alertServiceConfig);
  }

  /**
   * Calculates the end time of session
   *
   * @param {Object} startTime
   * @param {Object} duration
   *
   * @return {String} endTime
   */
  calculateSessionEndTime(startTime, duration) {
    let timeSpan = duration.split(':');
    timeSpan = timeSpan.map(Number);

    startTime = moment(startTime, 'HH:mm');
    const endTime = startTime.add(timeSpan[0], 'hours').add(timeSpan[1], 'minutes');
    return endTime.format('HH:mm');
  }

  /**
   * Gets the selected pairing days that the user checked
   *
   * @return {void}
   */
  getSelectedDays() {
    return this.daysOfAvailability
      .filter(day => day.checked)
      .map(day => day.value);
  }

  /**
   * Saves the basic and complementary skills
   *
   * @param {Object} type of skill
   *
   * @return {void}
   */
  saveSkills(type, insertedSkill) {
    let selectedSkill;

    for (const skill of this.skills) {
      if (skill.name === insertedSkill) {
        selectedSkill = skill;
        break;
      }
    }

    if (this.requestSkills.includes(selectedSkill)) {
      return;
    }

    if (type === 'basic') {
      if (selectedSkill) {
        this.requestSkills.push(selectedSkill)
        this.basicSkills.push(selectedSkill);
      }
    }

    if (type === 'complementary') {
      if (selectedSkill) {
        this.requestSkills.push(selectedSkill);
        this.complementarySkills.push(selectedSkill);
      }
    }
  }

  /**
   * Deletes selected skills in form
   *
   * @param {Object} skill object to be deleted
   * @param {String} type of skill
   * @param {Number} position/index of the skill in array
   *
   * @return {void}
   */
  deleteRequestSkill(skill, type, position) {
    this.requestSkills.splice(position, 1);
    if (type === 'basic') {
      if (this.basicSkills[position].name === skill) {
        this.basicSkills.splice(position, 1);
        this.isEmptyBasicSkills = this.basicSkills.length === 0 ? true : false;
      }

    } else {
      if (this.complementarySkills[position].name === skill) {
        this.complementarySkills.splice(position, 1);
      }
    }
  }

  /**
   * Gets the list of skills from the server
   *
   * @return {void}
   */
  fetchSkills() {
    this.skillService.getSkills({ includeTrashed: false })
      .toPromise()
      .then((res) => {
        this.skills = res.map(skill => ({
          name: skill.name,
          id: skill.id,
        })),
          this.skillNames = res.map(skill => skill.name);
      });
  }

  /**
   * Curate a selection of time slots for the start and end time select boxes
   *
   * @return {void}
   */
  getTimeSlots() {
    const totalTimeSteps = 48;

    if (this.timeSlots.length < totalTimeSteps) {
      const currentTime = moment().startOf('day');

      for (let i = 1; i <= totalTimeSteps; i = i + 1) {
        this.timeSlots.push(currentTime.format('HH:mm'));
        currentTime.add(30, 'm'); // time intervals of 30mins each
      }
    }
  }

  /**
   * Adds or subtracts time from duration input box
   *
   * @param {String} time value from duration input box
   * @param {String} operation to perform on the time
   *
   * @return {void}
   */
  changeTime(time, operation) {
    this.durationTime = this.removeHrsMinsStrings(time);
    this.durationTime = moment(time, 'HH:mm');

    operation === 'add' ? this.durationTime.add(30, 'm') : this.durationTime.subtract(30, 'm');
    this.sessionDuration = this.durationTime.format('HH:mm');
    this.duration = this.durationTime.format('HH:mm');
    this.duration = this.addHrsMinsStrings(this.duration);

  }

  /**
   * Validates session duration by checking
   * if the selected duration is equal to '00:00' and return
   * false if true
   *
   * @param {string} duration how long the session
   * is supposed to last
   *
   * @return {boolean} true or false
   */
  validateSessionDuration(duration): boolean {
    if (duration === '0hr 00mins') {
      return false;
    }
  }

  /**
   * Checks the all days checkbox, when all the days has been checked
   * or unchecks it whenever the allDays checkbox is checked.
   *
   * @param {Object} day the day object selected
   *
   * @return {void}
   */
  toggleAllDaysCheckbox(day) {
    if (this.isAllDaysChecked) {
      this.isAllDaysChecked = false;
    } else {
      if (day.checked) {
        for (const weekDay of this.daysOfAvailability) {
          if (!weekDay.checked) {
            return;
          }
        }
        this.isAllDaysChecked = true;
      }
    }
  }

  /**
   * Checks all the days when the allDays checkbox is checked
   * or uncheck all the days when the allDays checkbox is uncheck.
   *
   * @return {void}
   */
  toggleWeekDaysCheckbox() {
    for (const day of this.daysOfAvailability) {
      day.checked = !this.isAllDaysChecked;
    }
    this.isAllDaysChecked = !this.isAllDaysChecked;
  }

  /**
   * Sets the timezone to be used in the requestDetails payload
   *
   * @param {string} timeZone
   *
   * return {void}
   */
  setTimeZone(timeZone: string) {
    this.selectedTimeZone = timeZone;
  }

  /**
   * Sets the start time for the mentorship session to be used
   * in the requestDetails payload.
   *
   * @param {string} startTime
   *
   * return {void}
   */
  setStartTime(startTime: string) {
    this.startTime = startTime;
  }

  /**
   * Sets the duration of months to be used in the payload
   *
   * @param {string} durationOfMonths
   *
   * return {void}
   */
  setMonthDuration(durationOfMonths: number) {
    this.durationOfMonths = durationOfMonths;
  }

  /**
   * Formats the list of selected days to include the ampersand('&') and
   * commas depending on the number of days selected.
   *
   * @return {string} days
   */
  formatSelectedDays() {
    const days = this.getSelectedDays();
    let selectedDays = days.length > 1 ? days.join(', ') : days[0];
    const commaIndex = selectedDays.lastIndexOf(', ');
    selectedDays = commaIndex !== -1 ?
      selectedDays.substring(0, commaIndex) + ' & ' + selectedDays.substring(commaIndex + 1) : selectedDays;
    return selectedDays;
  }

  /**
   * Formats the time using moment by appending 'am' or 'pm' at the
   * end of the time string.
   *
   * @param {string} time
   *
   * @return {string} The time in 'am' or 'pm'
   */
  getAmPmTime(time: string) {
    const formattedTime = moment(time, 'hh:mm').format('hh:mm a');
    return formattedTime;
  }

  /**
   * Formats the duration of months selected and adds the strings 'months' or
   * 'month' depending on the duration selected.
   *
   * @return {string} The duration of months appended with either 'months' or 'month'
   */
  displayDurationOfMonths() {
    const formattedMonthDuration = this.durationOfMonths === 1 ?
      `${this.durationOfMonths} month` : ` ${this.durationOfMonths} months`;
    return formattedMonthDuration;
  }

  /**
   * Counts the number of characters in the description text field and represents its
   * value using the SVG circle
   *
   * @param {number} length This is the data emitted with the keyup event
   *
   * @return {void}
   */
  calculateCharacterCountDown(length) {
    const characterLength = length;
    this.charactersLeft = this.maxLength - characterLength;
    const strokePerWord = characterLength / this.maxLength;
    this.strokeDashOffset = ((2 * Math.PI * this.radius) * (1 - strokePerWord));
    this.isCharacterLimitClose = this.charactersLeft <= 20;
    this.isStrokeDashOffsetLimitClose = this.strokeDashOffset <= 7.1829;
    this.isStrokeDashOffsetEqualZero = this.strokeDashOffset === 0;
  }
}

