import { Component, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-request-details-page',
  templateUrl: './request-details-page.component.html',
  styleUrls: ['./request-details-page.component.scss'],
})

export class RequestDetailsPageComponent implements OnInit {
  @Input() request;
  mentee = {
    name: '',
    rating: 0,
  };
  primarySkills: string;
  secondarySkills: string;
  constructor(
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.getMentee();
    this.formatRequestSkills();
    this.formatRequestDuration();
  }

  /** Assign request details.
   *
   * @return {void}
   */
  formatRequestDuration() {
    let requestDuration = '';
    if (this.request.duration.trim() === '1') {
      requestDuration = `${this.request.duration} month`;
    } else {
      requestDuration = `${this.request.duration} months`;
    }

    if (this.request.pairing.days.length  === 1) {
      this.request.duration = `${requestDuration} (${this.request.pairing.days[0]} at
       ${moment(this.request.pairing.start_time, 'HH:mm').format('hh:mm a')})`;
    } else {
      this.request.duration =  `${requestDuration} (${this.formatRequestDays()} at
       ${moment(this.request.pairing.start_time, 'HH:mm').format('hh:mm a')})`;
    }
  }

  /**
   * Format request skills.
   *
   * @return {void}
   */
  formatRequestSkills() {
    for (const skill of this.request.request_skills) {
      if (skill.type === 'secondary') {
        if (!this.secondarySkills) {
          this.secondarySkills = skill.name;
        } else {
          this.secondarySkills = this.secondarySkills + ', ' + skill.name;
        }
      } else {
        if (!this.primarySkills) {
          this.primarySkills = skill.name;
        } else {
          this.primarySkills = this.primarySkills + ', ' + skill.name;
        }

      }
    }

  }

  /**
   * Assign mentee name and ratings.
   *
   * @return {void}
   */
  getMentee() {
    this.userService.getUserInfo(this.request.mentee_id)
      .toPromise().then((user) => {
        this.mentee.name = user.name;
        this.mentee.rating = user.rating;
      });
  }

  /**
   * Capitalize the first letter of each days
   *
   * @return {string} a string containing all the days with their first later
   * being capitalize
   */
  formatRequestDays() {
    let formatedDays = this.request.pairing.days[0].charAt(0).toLocaleUpperCase() + this.request.pairing.days[0].slice(1);
    this.request.pairing.days.forEach((day, index) => {
      if (index !== this.request.pairing.days.length - 1 && index !== 0) {
        formatedDays = `${formatedDays}, ${day.charAt(0).toLocaleUpperCase() + day.slice(1)}`;
      } else if (index !== 0) {
        formatedDays = `${formatedDays} & ${day.charAt(0).toLocaleUpperCase() + day.slice(1)}`;
      }
    });
    return formatedDays;
  }
}
