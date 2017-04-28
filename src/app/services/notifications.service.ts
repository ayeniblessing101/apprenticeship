
import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

/**
 * @interface Notice
 * Blueprint for the notification message
 */
interface Notice {
  title: string;
  content: string;
}

/**
 * @interface Message
 * Blueprint for the notification object
 */
interface Message {
  type: string;
  message: Notice;
  sender: string;
  messageUrl: string;
  timestamp: number;
}

@Injectable()
export class NotificationService {
  private userMessages: {[id: string]: {}};
  private unreadCount: number;
  private database;

  /**
   * Creates an instance of the NotificationService.
   *
   * @param {AngularFire} firebase firebase SDK
   * @memberOf NotificationService
   */
  constructor(private firebase: AngularFire) {
    this.database = firebase.database;
    this.userMessages = {};
    this.unreadCount = 0;
  }

  /**
   * sendMessage sends notifications to users
   *
   * @param {any[]} users an array of userIds
   * @param {Message} message notification object
   * @return {String} success message
   * @memberOf NotificationService
   */
  sendMessage(users: any[], message: Message) {
    return this.database
      .list('/Messages')
      .push(message)
      .then(sentItem => users.forEach(user => this
      .database.object(`Users/${user}/${sentItem.key}`)
      .update({
        read: false,
        timestamp: message.timestamp
      })))
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  /**
   * getUserMessages fetches an array of messages by user id
   *
   * @param {string} userId the userId
   * @param {number} limit the number of messages to return
   * @return {FirebaseListObservable<any[]>}
   * @memberOf NotificationService
   * @Todo remember to optimize database index for timestamp
   */
  getUserMessages(userId: string, limit?: number) {
    return this.database.list(`Users/${userId}`, {
      query: {
        orderByChild: 'timestamp',
        limitToLast: limit || 10,
      }
    })
    .subscribe((queriedItems) => {
      const messageKeys = [];
      this.userMessages = {};

      queriedItems.forEach(item => messageKeys.push(item['$key']));

      /**
       * This block uses each message key stored earlier to subscribe to the messages collection,
       * then appends read status/property of the messages stored in the users' collection to each message.
       * The read status for each message is stored in the users' collection(the receiver) so that
       * they can be independently updated. Based on the number of unread messages found
       * for each user, the corresponding notification count is updated.
       */
      messageKeys.forEach((key) => {
        this.unreadCount = 0;
        this.database.object(`Messages/${key}`)
          .subscribe(message => {
            message.read = queriedItems.filter(item => item['$key'] === key)[0].read;
            if (!message.read) {
              this.unreadCount += 1;
            }
            this.userMessages[key] = message;
          });
      });
    });
  }

  /**
   * markMessagesAsRead updates read status of messages by user id
   *
   * @param {string} userId the userId
   * @param {any[]} messageIds an array of messsage ids
   * @return {String} success message
   * @memberOf NotificationService
   */
  markMessagesAsRead(userId: string, messageIds: any[]) {
    return messageIds.forEach(id => this.database
      .object(`Users/${userId}/${id}`)
      .update({ read: true })
      .then(this.handleSuccess)
      .catch(this.handleError));
  }

  /**
   * Get Current User's Latest Notifications
   *
   * @return {Object} user notifications
   */
  getUserNotifications(): Object {
    return this.userMessages;
  }

  /**
   * return the number of unread notifications
   *
   * @return {Number}
   */
  getUnreadCount(): Number {
    return this.unreadCount;
  }

  /**
   * handleSuccess method
   *
   * @private
   * @return {String} return a string message
   * @memberOf NotificationService
   */
  private handleSuccess(): String {
    return 'write successful';
  }

  /**
   * handleError method
   *
   * @private
   * @param {*} error error parameter
   * @return {*} return the error parameter
   * @memberOf NotificationService
   */
  private handleError(error: any): any {
    return error;
  }
}
