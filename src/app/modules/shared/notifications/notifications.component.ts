import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as moment from 'moment';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from 'app/services/notifications.service';
import { UserService } from 'app/services/user.service';
import { NotificationTypes } from '../../../enums/notification-types.enum';
import { Notification } from 'rxjs/Notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [trigger('notificationsState', [
    state('true', style({
      transform: 'translateX(0%)',
    })),
    state('false', style({
      transform: 'translateX(100%)',
    })),
    transition('1 <=> 0', animate('500ms ease-in-out')),
  ])],
})

export class NotificationsComponent implements OnInit, OnChanges {
  @Output() close: EventEmitter<null> = new EventEmitter();
  @Input() state = false;

  currentUserId: string;
  notifications: any;
  notificationGroups: string[] = [];
  notificationTypes = NotificationTypes;

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private userService: UserService) {
  }

  ngOnInit() {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      this.currentUserId = this.userService.getCurrentUser().id;
      this.notificationService.getUserMessages(this.currentUserId, 10);
    }
  }

  ngOnChanges() {
    this.notifications = this.getNotifications();
    if (!this.state) {
      this.notificationGroups = [];
    }
  }

  /**
   * @description Gets list of message keys from the notification object
   *
   * @param {object} notifications
   *
   * @returns {Array} String
   */
  getMessageIds(notifications: object) {
    return Object.keys(notifications).map(elem => notifications[elem])
      .map(x => x.map(b => b.$key)).reduce((a, b) => a.concat(b));
  }


  /**
   * Categorizes notifications by time created i.e today, wednesday, 1 week ago, etc
   *
   * @param {object} notifications object containing information about each notification
   *
   * @returns {object} new notifications categorized by date
   */
  groupNotificationsByDate(notifications: object) {
    const groupedNotifications = {};

    Object.keys(notifications).forEach((notificationId) => {
      const notification = notifications[notificationId];
      const category = this.generateReadableDate(notification.timestamp);
      if (groupedNotifications[category]) {
        groupedNotifications[category].push(notification)
      } else {
        groupedNotifications[category] = [notification];
        this.notificationGroups.push(category);
      }
    });
    return groupedNotifications;
  }


  /**
   * @description Marks all notifications as read;
   *
   * @param {String}
   *
   * @return {Void}
   */
  markMessagesAsRead(): void {
    this.notificationService.markMessagesAsRead(
      this.authService.userInfo.id,
      this.getMessageIds(this.notifications)
    );
  }

  /**
   * It fetches all notifications from notification service for current user
   *
   * @return {Array} notifications
   */
  getNotifications(): object {
    const notifications = this.notificationService.getUserNotifications();
    return this.groupNotificationsByDate(notifications);
  }

  /**
   * It formats the time when the notification was sent in a more human
   * readable form.
   *
   * @param {number} timestamp Time when  the notifcation was sent
   * in milliseconds
   *
   * @return {string} Date in a human readable form
   */
  generateReadableDate(timestamp) {
    let readableDateTime;
    const momentDateTime = moment(timestamp);
    const oneWeek = 7;
    const oneMonth = 30;
    const daysPast = moment().diff(timestamp, 'days');

    if (daysPast < 1) {
      readableDateTime = 'Today';
    } else if (daysPast === oneWeek) {
      readableDateTime = '7 days ago';
    } else if (daysPast < oneWeek) {
      const daysPastInWords = moment()
        .subtract(daysPast, 'days')
        .calendar().split(' ');

      if (daysPastInWords[0] === 'Last') {
        readableDateTime = daysPastInWords.splice(0, 2).join(' ');
      } else {
        readableDateTime = daysPastInWords.splice(0, 1).join(' ');
      }
    } else if (daysPast > 7 && daysPast <= oneMonth) {
      const weeksPast = Math.round(daysPast / 7);
      readableDateTime = `${weeksPast} Weeks Ago`;
    } else {
      readableDateTime = momentDateTime.fromNow();
    }

    return readableDateTime;
  }

  /**
   * It changes timestamp to true date-time string
   *
   * @param {number} timestamp time of notification
   *
   * @return {string} date-time when notification was created
   */
  getNotificationDateTime(timestamp: number) {
    return moment(timestamp).valueOf();
  }

  /**
   * closes the notifications component
   *
   * @param {Event} event Native DOM event
   *
   * @return {void}
   */
  closeNotifications(event) {
    event.preventDefault();
    if (event.target.id === 'notification-overlay' || event.target.id === 'notification-close-x') {
      this.close.emit(null);
      this.markMessagesAsRead()
    }
  }
}
