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
  sender?: string;
  timestamp: number;
}

@Injectable()
export class NotificationService {
  userMessages: {[id: string]: {}};

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
  }

  /**
   * sendMessage sends notifications to users
   *
   * @param {any[]} users an array of userIds
   * @param {Message} message notification object
   * @returns {String} success message
   * @memberOf NotificationService
   */
  sendMessage(users: any[], message: Message) {
    return this.database
      .list('Messages')
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
   * @returns {FirebaseListObservable<any[]>}
   * @memberOf NotificationService
   * @Todo remenber to optimize database index for timestamp
   */
  getUserMessages(userId: string, limit?: number):  {[id: string]: {}} {
    this.database.list(`Users/${userId}`, {
      query: {
        orderByChild: 'timestamp',
        limitToLast: limit || 10
      }
    }).subscribe(queriedItems => {
      const messageKeys = [];
      queriedItems.forEach(item => messageKeys.push(item['$key']));
      Object.keys(this.userMessages).reverse().forEach((key) => {
        if (!(key in messageKeys)) {
          delete this.userMessages[key];
        }
      });
      return messageKeys.forEach(key => this
      .database.object(`Messages/${key}`).subscribe(message => this
      .userMessages[key] = message));
    });
    return this.userMessages;
  }

  /**
   * markMessagesAsRead updates read status of messages by user id
   *
   * @param {string} userId the userId
   * @param {any[]} messageIds an array of messsage ids
   * @returns {String} success message
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
   * handleSuccess method
   *
   * @private
   * @returns {String} return a string message
   * @memberOf NotificationService
   */
  private handleSuccess() {
    return 'write successful';
  }

  /**
   * handleError method
   *
   * @private
   * @param {*} error error parameter
   * @returns {*} returns the error parameter
   * @memberOf NotificationService
   */
  private handleError(error: any) {
    return error;
  }
}
