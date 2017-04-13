import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FilterService {
  checkedSkills: any[] = [];
  checkedStatuses: any[] = [];

  constructor() {}

  /**
  *  toggler
  *
  *  helper method that toggles a certain input on a target variable i.e. checks
  *  if the input exists and adds it if it does not. If it exists, it removes the
  *  input from the target.
  *
  *  @param String input, Array target
  */
  toggler(target, input) {
    if (target.includes(input)) {
      const pos = target.indexOf(input);
      target.splice(pos, 1);
    } else {
      target.push(input);
    }
  }

  /**
  *  toggleSkill
  *
  *  this method uses the toggler method to toggle the checkedSkills
  *
  *  @param String skill
  */
  toggleSkill(skill) {
    this.toggler(this.checkedSkills, skill);
  }

  /**
  *  toggleStatus
  *
  *  this method uses the toggler method to toggle the checkedStatuses
  *
  *  @param String status
  */
  toggleStatus(status) {
    this.toggler(this.checkedStatuses, status);
  }

  /**
  *  getCheckedSkills
  *
  *  gets the checkedSkills attribute and returns it as an Observable
  *
  *  @return Observable containing checkedSkills array
  */
  getCheckedSkills(): Observable<any> {
    return Observable.of(this.checkedSkills);
  }

  /**
  *  getCheckedStatuses
  *
  *  gets the checkedStatuses attribute and returns it as an Observable
  *
  *  @return Observable containing checkedStatuses array
  */
  getCheckedStatuses(): Observable<any> {
    return Observable.of(this.checkedStatuses);
  }
}
