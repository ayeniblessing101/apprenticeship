import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to format request skills into an array
 */

@Pipe({
  name: 'requestStatus',
})
export class RequestStatusPipe implements PipeTransform {
  /**
  * Takes the unformatted request status and returns a corresponding string
  *
  * @param {string} statusId - Request status
  *
  * @return {string} - Request status
  */
  transform(statusId: number): string {
    let status = '';
    switch (statusId) {
      case 1: status = 'Pending';
        break;
      case 2: status = 'In Progress';
        break;
      case 3: status = 'Completed';
        break;
      case 4: status = 'Cancelled';
        break;
      default: status = '';
    }
    return status;
  }
}
