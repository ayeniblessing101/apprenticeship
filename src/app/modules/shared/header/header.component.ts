import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HelperService } from '../../../services/helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  displayNotifications: boolean;
  isAdmin = false;
  currentUser: any;

  constructor(
    private authService: AuthService,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.displayNotifications = false;
    if (this.authService.userInfo.roles.LENKEN_ADMIN) {
      this.isAdmin = true;
    }
    this.currentUser = this.helperService.getCurrentUser();
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
}
