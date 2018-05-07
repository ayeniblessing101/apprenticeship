import { Component, Input, OnInit, Output } from '@angular/core';

import { UserService } from '../../../services/user.service';
import { RequestTypes } from '../../../enums/request-types.enum';
@Component({
  selector: 'app-request-details-page',
  templateUrl: './request-details-page.component.html',
  styleUrls: ['./request-details-page.component.scss'],
})
export class RequestDetailsPageComponent implements OnInit {
  @Input() request;

  name: string;
  rating: any;
  primarySkills: string;
  secondarySkills: string;
  requestTypes = RequestTypes;

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.getUserInfo();
  }

  /**
   * Gets user information
   *
   * @return {void}
   */
  getUserInfo() {
    this.userService.getUserInfo(this.request.created_by.id)
      .toPromise().then((user) => {
        this.name = user.name;
        this.rating = (this.request.request_type_id === this.requestTypes.MENTEE_REQUEST)
        ? user.rating.mentee_average : user.rating.mentor_average;
      });
  }

}
