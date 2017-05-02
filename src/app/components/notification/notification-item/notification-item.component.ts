import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../../../interfaces/message.interface';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})

export class NotificationItemComponent {
  @Input() notification: Message;
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
    return title.length > 100 ? `${title.substr(0, 100)}...` : title;
  }

  /**
   * sets the background of each notification item to white
   * indicating that it has been read
   *
   * @return {Object} title - trimmed title
   */
  setNotificationBg(): Object {
    if (this.notification['read']) {
      return { background: '#fff' }
    }
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
