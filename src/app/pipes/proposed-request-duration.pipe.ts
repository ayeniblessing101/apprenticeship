import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
 * Format the request duration and pairing days into one string.
 * Takes a request and uses the request duration and pairing days
 * to created a formated string that will be shown to a user.
 */

@Pipe({
  name: 'proposedRequestDuration',
})
export class ProposedRequestDurationPipe implements PipeTransform {

  /**
   * Transform mentorship request duration and request pairing days into one string
   *
   * @param {object} request - Mentorship Request
   *
   * @return {string}
   */
  transform(request: any): any {
    let requestDuration = '';
    if (request.duration.trim() === '1') {
      requestDuration = `${request.duration} month`;
    } else {
      requestDuration = `${request.duration} months`;
    }

    return `${requestDuration} (${this.formatRequestDays(request)} at
       ${moment(request.pairing.start_time, 'HH:mm').format('hh:mm a')})`;
  }

  /**
   * Capitalize the first letter of each day
   *
   * @param {object} request - Mentorship request
   *
   * @return {string} a string containing all the days with their first later
   * being capitalize
   */
  formatRequestDays(request: any) {
    let formatedDays = request.pairing.days[0].charAt(0).toLocaleUpperCase() + request.pairing.days[0].slice(1);
    request.pairing.days.forEach((day, index) => {
      if (index !== request.pairing.days.length - 1 && index !== 0) {
        formatedDays = `${formatedDays}, ${day.charAt(0).toLocaleUpperCase() + day.slice(1)}`;
      } else if (index !== 0) {
        formatedDays = `${formatedDays} & ${day.charAt(0).toLocaleUpperCase() + day.slice(1)}`;
      }
    });
    return formatedDays;
  }

}
