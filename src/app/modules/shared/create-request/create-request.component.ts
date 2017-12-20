import { Component, EventEmitter, OnInit, Input, Output, HostListener, ViewChild, ElementRef} from '@angular/core';
import { SkillService } from '../../../services/skill.service';
import { RequestService } from '../../../services/request.service';
import { AlertService } from '../../../services/alert.service';
import { UserService } from '../../../services/user.service';
import { Skill } from '../../../interfaces/skill.interface';
import { PairingDay } from '../../../interfaces/pairing-day.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss'],
})

export class CreateRequestComponent implements OnInit {
  @Input() requestType;

  @ViewChild('createRequestModal') createRequestModal: ElementRef;

  @Output() closeMentorshipModal = new EventEmitter<boolean>();

  skills: any[] = [];
  basicSkills: Skill[] = [];
  complementarySkills: Skill[] = [];

  timeSlots: string[] = [];
  selectedDays: string[];
  timeSelected: string;

  daysOfAvailability: PairingDay[];
  lengthOfMentorship: number[];
  numberOfMonths: number;
  durationTime: any;
  duration: string;
  currentUser: any;
  title: string;

  constructor(
    private skillService: SkillService,
    private requestService: RequestService,
    private alertService: AlertService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.daysOfAvailability = [
      { name: 'Mon', value: 'monday', checked: false },
      { name: 'Tue', value: 'tuesday', checked: false },
      { name: 'Wed', value: 'wednesday', checked: false },
      { name: 'Thur', value: 'thursday', checked: false },
      { name: 'Fri', value: 'friday', checked: false },
    ];

    this.lengthOfMentorship = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.fetchSkills();
    this.getTimeSlots();
    this.currentUser = this.userService.getCurrentUser();
    this.duration = '01:30';
    this.durationTime = moment(this.duration);

    this.title = this.requestType;
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
      this.closeMentorshipRequestModal();
    }
  }

  /**
   * Closes the mentorship request modal
   *
   * @returns {void}
   */
  closeMentorshipRequestModal() {
    this.closeMentorshipModal.emit();
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
    const selectedDays = this.getSelectedDays();

    if (selectedDays.length === 0 || this.basicSkills.length === 0) {
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
      const sessionEndTime = this.calculateSessionEndTime(form.value.startTime, form.value.duration);
      const requestDetails = {
        isMentor,
        title: form.value.neededSkill,
        description: form.value.description,
        primary: basicSkillIds,
        secondary: complementarySkillIds,
        duration: form.value.period,
        location: this.currentUser.location,
        pairing: {
          start_time: form.value.startTime,
          end_time: sessionEndTime,
          days: selectedDays,
          timezone: form.value.timeZone,
        },
      };

      return this.requestService.createRequest(requestDetails)
        .toPromise()
        .then(() => {
          this.closeMentorshipRequestModal();

          const alertServiceConfig = {
            abortActionText: 'CLOSE',
            confirmActionText: 'VIEW',
            canDisable: false,
          };

          return this.alertService.confirm('Your request was successfully created', this, alertServiceConfig);
        })
        .catch((error) => {
          return this.alertService.showMessage(error);
        });
    }
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

    if (type === 'basic') {
      if (selectedSkill) {
        this.basicSkills.push(selectedSkill);
      }
    }

    if (type === 'complementary') {
      if (selectedSkill) {
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
  deleteBasicSkill(skill, type, position) {
    if (type === 'basic') {
      if (this.basicSkills[position].name === skill) {
        this.basicSkills.splice(position, 1);
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
    this.skillService.getSkills()
      .toPromise()
      .then((res) => {
        this.skills = res.map(skill => ({
          name: skill.name,
          id: skill.id,
        }))
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
    this.durationTime = moment(time, 'HH:mm');

    operation === 'add' ? this.durationTime.add(30, 'm') : this.durationTime.subtract(30, 'm');
    this.duration = this.durationTime.format('HH:mm');
  }

  /**
   * Checks all days when the all days checkbox is selected
   *
   * @return {void}
   */
  checkAllDays() {
    for (const day of this.daysOfAvailability) {
      day.checked = true;
    }
  }

  /**
   * Formats the display of the autocomplete list in form
   *
   * @param {Object} skill object name
   *
   * @return {String} skill name to be displayed in autocomplete form input
   */
  autocompleListFormatter(skill: any) {
    return skill.name;
  }
}
