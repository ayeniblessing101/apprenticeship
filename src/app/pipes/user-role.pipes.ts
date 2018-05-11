import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to determine user role on a request
 */

@Pipe({
  name: 'userRole',
})
export class UserRolePipe implements PipeTransform {
  /**
  * Returns the user role on a request based on the user id of the logged user
  * and the mentee and/or mentee id field of the request
  *
  * @param {string} userId - userId
  * @param {object} request - Request
  *
  * @return {string} - User role
  */
  transform(request: any, userId: string): string {
    if (request.mentee.id === userId) {
      return 'Mentee';
    } else if (request.mentor.id === userId) {
      return 'Mentor';
    }
  }
}
