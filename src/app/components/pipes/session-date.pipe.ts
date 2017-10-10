import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'sessionDate'
})
export class SessionDatePipe implements PipeTransform {
  transform(value: any, inputFormat: string, outputFormat: string): string {
    // Try and parse the passed value.
    const momentDate = moment(value, inputFormat);
    // If moment didn't understand the value, return it unformatted.
    if (!momentDate.isValid()) return value;

    // Otherwise, return the date formatted as requested.
    return momentDate.format(outputFormat).toString();
  }
}

