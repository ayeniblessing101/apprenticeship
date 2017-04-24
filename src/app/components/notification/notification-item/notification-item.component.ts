import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})

export class NotificationItemComponent {
  @Input() notification: Object;
  @Input() id: string;
  @Output() readNotificationMsg = new EventEmitter();

  constructor () {}

  /**
   * trims message titles that are too long
   *
   * @param {String} title - message title
   * @return {String} title - trimmed title
   */
  trimMessageTitle(title: string): String {
    if (title.length > 100) return `${title.substr(0, 100)}...`;
    return title;
  }

  /**
   * sets the background of each notification item to white
   * indicating that it has been read
   *
   * @return {Object} title - trimmed title
   */
  setNotificationBg(): Object {
    if (this.notification['read']) return { background: '#fff' };
  }

  /**
   * updates the read status of current notification to true
   *
   * @return {Void}
   */
  readNotification(): void {
    this.readNotificationMsg.emit(this.id);
  }
}
