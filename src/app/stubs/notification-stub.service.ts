import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

import notifications from '../mocks/notifications';

@Injectable()
export class NotificationServiceStub {

  /**
   * It returns a list of notification object
   *
   * @returns {object[]} array of notifications
   */
  getUserNotifications(): object[] {
    return notifications;
  }

  /**
   * It returns an observable of notificaations
   *
   * @returns {Observables<Array>} observable of notifications
   */
  getUserMessages() {
    return Observable.of(notifications);
  }

  /**
   * It returns success message
   *
   * @returns {string} success message
   */
  sendMessage() {
    return 'write successful';
  }
}
