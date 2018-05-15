import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from 'app/services/notifications.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { RequestTypes } from '../../../enums/request-types.enum';
import { SearchTypes } from '../../../enums/search-types.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  @Input() currentUser: any;
  displayNotifications = false;
  showHeaderContent = true;
  redirectUrl = `${environment.apiGateway}/login?redirect_url=${environment.lenkenBaseUrl}/request-pool`;
  isAdmin = false;
  isLoggedIn = false;
  displayCreateRequestModal = false;
  requestTypes = RequestTypes;
  requestType: number;
  selectedRequest: any[];
  showRequest = false;
  records: any;
  displaySearchPage = false;
  searchTypes = SearchTypes;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private alertService: AlertService,
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
  showCreateRequestModal(requestType: number) {
    this.requestType = requestType;
    this.displayCreateRequestModal = true;
  }



  /**
   * Closes mentorship request modal
   *
   * @return {void}
   */
  closeCreateRequestModal() {
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
   * Closes the request details modal
   *
   * @param {$event} event onClose event for closing request details modal
   * @return {void}
   */
  closeRequestDetailsModal() {
    this.showRequest = false;
  }

  /**
   * Log out the user from the session
   */
  logoutUser() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  /**
   * Shows the request details modal given the parameter is a request object.
   *
   * @param {Object} request - the request, whose details is to be displayed.
   */
  showRequestDetailsModal(request) {
    this.selectedRequest = request;
    this.showRequest = true;
  }
}
