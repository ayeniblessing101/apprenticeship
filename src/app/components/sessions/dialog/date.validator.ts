import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export class DateValidator {

  /**
   * Function that checks if date entered is in the future or before
   * the past six months. If true for either case it will return an error
   * object. If false then it will return null.
   *
   * @return {Object} error object contains both the error status and error message
   */
  rangeValidator(control: AbstractControl) {
    let dateIsValid = true;

    if (Date.parse(control.value) < Date.parse(moment().subtract(6, 'months').format())) {
      dateIsValid = false;
    }

    if (Date.parse(control.value) > Date.parse(Date())) {
      dateIsValid = false;
    }

    return dateIsValid ? null : { dateRange: !dateIsValid };
  }
}
