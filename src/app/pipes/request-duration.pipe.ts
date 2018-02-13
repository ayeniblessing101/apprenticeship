import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to format request duration
 */

@Pipe({
  name: 'requestDuration',
})
export class RequestDurationPipe implements PipeTransform {
  /**
   * Transform duration from 1 to '1 Month`
   *
   * @param {requestDuration} requestDuration - Request Duration
   *
   * @return {string} - Formatted string
   */
  transform(requestDuration: any): any {
    if (requestDuration === 1) {
      return `${requestDuration} Month`;
    } else {
      return `${requestDuration} Months`;
    }
  }
}
