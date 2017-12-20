import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  displayNotifications = false;
  isAdmin = false;
  @Input() currentUser: any;
  displayCreateRequestModal = false
  requestType: string;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    if (this.authService.userInfo.roles.LENKEN_ADMIN) {
      this.isAdmin = true;
    }
  }

  /**
   * Opens mentorship request modal
   *
   * @return {void}
   */
  showCreateRequestModal(requestType: string) {
    this.requestType = requestType;

    this.displayCreateRequestModal = true;
  }

  /**
   * Closes mentorship request modal
   *
   * @return {void}
   */
  closeMentorshipRequestModal() {
    this.displayCreateRequestModal = false;
  }

  /**
   * Opens the notifications component
   *
   * @param {void}
   * @return {void}
   */
  openNotifications() {
    this.displayNotifications = true;
  }

  /**
   * Closes the notifications component
   *
   * @param {$event} event onClose event for closing notifications component
   * @return {void}
   */
  closeNotifications() {
    this.displayNotifications = false;
  }

  /**
   * log out the user from the session
   */
  logoutUser() {
    this.authService.logOut();
  }
}
