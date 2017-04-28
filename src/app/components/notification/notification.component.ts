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

export class NotificationComponent implements OnInit {
  private openNotificationPanel: boolean;
  private msgLimit: number;
  private userId: string;

  constructor (
    private notificationService: NotificationService, private auth: AuthService
  ) {
    this.userId = this.auth.userInfo.id;
    this.openNotificationPanel = false;
    this.msgLimit = 10;
  }

  ngOnInit() {
    this.getUserMessages(this.userId, this.msgLimit);
  }

  /**
   * triggers the notification service to fetch messages
   *
   * @param {String} userId - Id of current user
   * @param {Number} limit - maximum number of notifications per request
   * @return {Object} notifications
   */
  getUserMessages(userId: string, limit?: number): void {
    this.notificationService.getUserMessages(userId, limit);
  }

  /**
   * fetches all notifications from notification service for current user
   *
   * @return {Array} notifications
   */
  getNotifications(): Array<any> {
    const messages = this.notificationService.getUserNotifications();

    return Object.keys(messages).map(messageId => messages[messageId]);
  }

  /**
   * returns the number of unread notifications
   *
   * @return {Number}
   */
  getUnreadCount(): Number {
    return this.notificationService.getUnreadCount();
  }

  /**
   * marks a message as read. If not supplied a paramter,
   * it marks all notifications as read;
   *
   * @param {String} - optional id
   * @return {Void}
   */
  markMessagesAsRead(event?: Object): void {
    if (event) {
      this.notificationService.markMessagesAsRead(this.userId, [event]);
    } else {
      this.notificationService.markMessagesAsRead(
        this.userId,
        this.getNotifications().map(message => message.$key)
      );
    }
  }

  /**
   * closes notifications dropdown on document click
   *
   * @param {Object} event - event object
   * @return {Void}
   *
   */
  @HostListener('document:click', ['$event'])
  closeDropDown(event: Object): void {
    if (this.openNotificationPanel && !/ntf/.test(event['target'].className)) {
      this.openNotificationPanel = false;
    }
  }

  /**
   * toggles the boolean value of openNotificationPanel
   *
   * @return {Void}
   */
  toggleNotificationDropdown(): void {
    this.openNotificationPanel ?
      this.openNotificationPanel = false : this.openNotificationPanel = true;
  }

  /**
   * sets the dropdown style based on the current value of openNotificationPanel
   *
   * @return {Object} - css style object
   */
  setDropDownStyle(): Object {
    return this.openNotificationPanel ? { display: 'block' } : { display: 'none' };
  }
}
