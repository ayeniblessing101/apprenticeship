import {
  Component,
  OnInit,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  ViewChild,
  HostListener,
} from '@angular/core';
import * as moment from 'moment';

import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-pending-modal',
  templateUrl: './pending-modal.component.html',
  styleUrls: ['./pending-modal.component.scss'],
})
export class PendingModalComponent implements OnInit {
  @Input() request;
  @Input() type;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('pendingModal') pendingModal: ElementRef;

  mentee: any;
  mentors: any[] = [];
  userIds: any[] = [];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    const pairingDays = this.formatDays(this.request.pairing.days);
    const pairingTime = moment(this.request.pairing.start_time, 'HH:mm')
                          .format('h.mm a');
    this.request['pairingDays'] = `${pairingDays} at ${pairingTime}`;

    this.userIds = [this.request.mentee_id];
    if (this.type === 'myRequests') {
      this.userIds = this.request.interested.concat([this.request.mentee_id]);
    }
    this.getUsersByIds(this.userIds);
  }

  /**
   * Picks up click events from the Host Listener to determine if
   * click was outside modal
   *
   * @param event
   */
  @HostListener('click', ['$event'])
  onClick(event) {
    if (!this.pendingModal.nativeElement.contains(event.target)) {
      this.closeModal();
    }
  }

  /**
   * Get user information of mentee and interested mentors by their ids
   *
   * @param {Array} userIds - contains mulitple user ids
   *
   * @returns void
   */
  getUsersByIds(userIds) {
    this.userService.getUsersByIds(userIds)
      .toPromise()
      .then((users) => {
        const formattedUsers = this.formatUserSkills(users);
        this.separateMenteeAndMentors(formattedUsers);
      });
  }

  /**
   * Separate mentee and interested mentors from users array
   *
   * @param {Array} users - array of all users, mentee and interested mentors
   */
  separateMenteeAndMentors(users) {
    users.forEach((user) => {
      if (user.id === this.request.mentee_id) {
        this.mentee = user;
      } else {
        this.mentors.push(user);
      }
    });
  }

  /**
   * Return structured user information for use within the modal
   *
   * @param {Array} users - users comprising a mentee and interested mentors
   *
   * @return {Object} user with formatted skills
   */
  formatUserSkills(users) {
    const formattedUsers = [];

    users.forEach((user) => {
      const userSkills = user.skills.map((skill) => {
        return skill.name;
      });
      user.skills = userSkills.join(', ');
      formattedUsers.push(user);
    });

    return formattedUsers;
  }

  /**
   * Format days to human friendly days format
   *
   * @param {Array} pairingDays - days and time information on pairing
   *
   * @return {String} formatted days string
   */
  formatDays(pairingDays) {
    const weekDays = [
      'monday', 'tuesday', 'wednesday',
      'thursday', 'friday', 'saturday',
      'sunday',
    ];

    if (weekDays.toString() === pairingDays.toString()) {
      return 'Every day'
    }

    const daysAreConsecutive =
      this.checkDaysAreConsecutive(weekDays, pairingDays);

    const capitalisedPairingDays = this.convertToTitleCase(pairingDays);

    const formattedDays =
      this.createFormattedDays(daysAreConsecutive, capitalisedPairingDays);

    return formattedDays;
  }

  /**
   * Check if pairing days are in consecutive order in relation to
   * weekdays
   *
   * @param {String[]} weekDays - all days of the week
   * @param pairingDays - days which pairing sessions are to be held
   *
   * @return {boolean} - true if pairing days are consecutive else false
   */
  checkDaysAreConsecutive(weekDays, pairingDays) {
    return (
      weekDays.slice(
        weekDays.indexOf(pairingDays[0]),
        (weekDays.indexOf(pairingDays[(pairingDays.length - 1)]) + 1),
      )
    ).toString() === pairingDays.toString();
  }

  /**
   * Create a string of formatted pairing days depending on whether days are
   * consecutive
   *
   * @param {boolean} daysAreConsecutive - value on whether pairing days are
   *    consecutive
   * @param {Array} capitalisedDays - contains capitalised pairing days
   *
   * @return {String} days that have been formatted
   */
  createFormattedDays(daysAreConsecutive, capitalisedDays) {
    let formattedDays;

    if (!daysAreConsecutive || capitalisedDays.length <= 2) {
      formattedDays = capitalisedDays.length === 1 ?
        capitalisedDays[0] : [
          capitalisedDays.slice(0, capitalisedDays.length - 1)
              .join(', '),
          capitalisedDays[capitalisedDays.length - 1],
        ].join(' & ');
    } else {
      const firstDay = capitalisedDays[0];
      const lastDay = capitalisedDays[capitalisedDays.length - 1];
      formattedDays =  `${firstDay} to ${lastDay}`;
    }

    return formattedDays;
  }

  /**
   * Capitalise first letter of string
   *
   * @param {Array} sentence - strings to convertToTitleCase
   *
   * @return {String} capitalised string
   */
  convertToTitleCase(sentence: string[]) {
    return sentence.map((word) => {
      word = word.toLowerCase();
      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    });
  }

  /**
   * Emits an event to PendingComponent to close modal
   */
  closeModal() {
    this.close.emit();
  }
}
