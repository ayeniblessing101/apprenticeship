import { Component, OnInit } from '@angular/core';
import { MdIcon } from '@angular/material';
import { HostListener } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notifications.service';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

@HostListener('document:click', ['$event'])
export class NotificationComponent implements OnInit {
  private notifications: Object;
  private msgKeys: string[];
  private displayPanel: boolean;
  private msgLimit: number;
  private unreadNotifications: number;
  private userId;

  constructor (
    private notificationService: NotificationService, private auth: AuthService
  ) {
    this.displayPanel = false;
    this.msgLimit = 10;
  }

  /**
   * gets notifications on component load and sets notification dropdown
   * display to false
   *
   * @return {Void}
   */
  ngOnInit(): void {
    this.userId = this.auth.userInfo.id;
    this.getNotifications(this.userId, this.msgLimit);
    this.unreadNotifications = Object.keys(this.notifications).length;
  }

  /**
   * setNotificationDropdownDisplay
   * toggles the boolean value of notification displayPanel
   *
   * @return {Void}
   */
  setNotificationDropdownDisplay(): void {
    this.displayPanel ? this.displayPanel = false : this.displayPanel = true;
  }

  /**
   * toggleNotificationDropdown
   * toggles the notification dropdown display
   *
   * @return {Object} - css style object
   */
  toggleNotificationDropdown(): Object {
    return this.displayPanel ? { display: 'block' } : { display: 'none' };
  }

  /**
   * fetches all notifications from notification service for current user
   *
   * @param {String|Number} userId - Id of current user
   * @param {Number} limit - maximum number of notifications per request
   * @return {Void}
   */
  getNotifications(userId: string, limit?: number): void {
    this.notificationService.getUserMessages(userId, limit);
    this.notifications = this.notificationService.userMessages;
    this.msgKeys = Object.keys(this.notifications);
  }

  /**
   * updates number of unread notifications
   *
   * @param {String} all - all notifications (optional)
   * @return {Void}
   */
  updateUnreadNotifications(all?: string): void {
    if (all && all === 'all') {
      this.unreadNotifications = 0;
    } else {
      this.unreadNotifications--;
    }
  }

  /**
   * closes notifications dropdown on document click
   *
   * @param {Object} event - event object
   * @return {Void}
   */
  closeDropDown(event: Object): void {
    if (this.displayPanel) {
      if (!/ntf/.test(event['target'].className)) {
        this.displayPanel = false;
      }
    }
  }
}
