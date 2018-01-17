import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

import users from '../mocks/users';

@Injectable()
export class UserServiceStub {

  /**
   * It Return all a user object.
   *
   * @param {string} userId user id
   *
   * @return {Observable} Observable collection of users.
   */
  getUserInfo(userId: string): Observable<any> {
    for (let index = 0; index < users.length; index += 1) {
      const currentUser = users[index];
      if (currentUser.id === userId) {
        return Observable.of(currentUser);
      }
    }
  }

  /**
   * It gets user by id
   *
   * @param {Array} userIds user Ids
   *
   * @return {Observable<any>} <Observable of users with id
   */
  getUsersById(userIds: string[]): Observable<any> {
    const filteredUsers = users.filter(user => userIds.includes(user.id));
    return Observable.of(filteredUsers);
  }

  /**
   * It returns first user
   *
   * @returns {object}  user info
   */
  getCurrentUser(): object {
    return users[0];
  }
}
