import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {

  currentUser: Object;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.currentUser = this.getCurrentUser();
  }

  /**
   * Get current user details
   *
   * @return {Object} current user details
   */
  getCurrentUser() {
    return this.userService.getCurrentUser();
  }
}
