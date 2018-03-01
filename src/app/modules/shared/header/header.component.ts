import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from 'app/services/notifications.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  displayNotifications = false;
  showHeaderContent = true;
  redirectUrl = `${environment.apiGateway}/login?redirect_url=${environment.lenkenBaseUrl}/request-pool`;
  isAdmin = false;
  isLoggedIn = false;
  @Input() currentUser: any;
  displayCreateRequestModal = false
  requestType: string;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
  ) {
    if (!localStorage.getItem('id_token')) {
      this.showHeaderContent = false;
      this.isLoggedIn = true
    }
  }

  ngOnInit() {
    if (this.authService.userInfo &&
      this.authService.userInfo.roles.LENKEN_ADMIN) {
      this.isAdmin = true;
    }
  }

  /**
   * Checks for unread notifications
   *
   * @return {Boolean}
   */
  checkIfUnreadNotificationsExist(): Boolean {
    return this.notificationService.getUnreadCount() > 0;
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
   * Log out the user from the session
   */
  logoutUser() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
