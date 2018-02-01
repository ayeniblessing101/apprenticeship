import { Component, Input, OnInit, Output } from '@angular/core';

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

}
