import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NotificationService } from '../../services/notifications/notifications.service';

@Component({
  selector: 'notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})

export class NotificationItem {
  @Input() notification: Object;
  @Input() id: string;
  @Output() readNotificationMsg = new EventEmitter();
  
  private userId = localStorage.getItem('id_token');
  private isNotificationRead: boolean;

  constructor(private notificationService: NotificationService) {
    this.isNotificationRead = false;
  }

  /**
   * trims message titles that are too long
   * 
   * @param {String} title - message title
   * @return {String} title - trimmed title
   */
  trimMessageTitle(title: string): string {
    if (title.length > 100) return `${title.substr(0, 100)}...`;
    return title;
  }

  /**
   * sets the background of each notification item to white
   * indicating that it has been read
   * 
   * @param {String} title - message title
   * @return {String} title - trimmed title
   */
  setNotificationBg(): Object {
    if (this.isNotificationRead) return { background: '#fff' };
  }

  /**
   * updates the read status of current notification to true
   * 
   * @param {Number} userId - current notification id (optional)
   * @param {Number} notificationId - current notification id (optional)
   * @return {Void}
   */
  readNotification(userId: string, notificationId?: number): void {
    if (!this.isNotificationRead) {
      this.notificationService.markMessagesAsRead(userId, [notificationId])
      this.readNotificationMsg.emit();
      this.isNotificationRead = true;
    }
  }
}