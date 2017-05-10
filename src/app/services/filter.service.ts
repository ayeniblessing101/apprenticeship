import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/'

import { RequestService } from './request.service';

@Injectable()
export class FilterService {
  // Array that stored checked filter.
  checkedSkills: any[] = [];
  interestedStatus: any[] = [];
  checkedStatuses: any[] = [];

  // Array that keeps track of each filter that has been clicked for the first time
  statusRegister: any[] = [];
  skillsRegister: any[] = [];
  interestedRegister: any[] = [];
  selectedDateRange: any[] = [0];
  

  // Publishes new result to other observables and subscribes to incoming results
  statusResult = new Subject<Object[]>();
  constructor(private request: RequestService) {}

  /**
  *  Filter filterRegistry
  *
  *  Helper function that helps to keep state of checked filters.
  *
  *  @param Array filterRegister Register of a particular filter
  *  @param Array filterState store for checked filters
  *  @param String filter Value of the filter
  *  @param string type the type of filter eg. status, skills
  */
  filterRegistry(filterRegister, filterState, type, filter) {
    /* 
     * Check if the filter has been clicked once before making a call to the 
     * server
     */ 
    if (filterRegister.includes(filter)) {
      // Check if a filter is currently selected
      if (filterState.includes(filter)) {
        const pos = filterState.indexOf(filter);
        filterState.splice(pos, 1);
      } else {
        filterState.push(filter);
      }

       return Observable.of([]);
    } else if (filter === undefined) {
      return Observable.of([]);
    } else {
      /*
       * if a filter has not been clicked before, add it to that filter
       * register and save the state as checked
       */
      filterRegister.push(filter);
      filterState.push(filter);

      return this.request.getRequestsByFilter(type, filter);
    }
  }

  /**
  * toggleSkill
  *
  * this method uses the toggler method to toggle the checkedSkills
  *
  * @param String skill
  */
  toggleSkill(skill) {
    this.filterRegistry(this.skillsRegister, this.checkedSkills, 'skills', skill);
  }

  /**
  * toggleStatus
  *
  * this method uses the toggler method to toggle the checkedStatuses
  *
  * @param String status
  */
  toggleStatus(status) {
    return this.filterRegistry(this.statusRegister,this.checkedStatuses, 'status', status).subscribe((res) => {
      this.statusResult.next(res);
    });
  }

  /**
   * setDateRange
   *
   * this method assigns a value to the selectedDateRange attribute
   *
   * @param {number} value
   *
   * @memberOf FilterService
   */
  setDateRange(value) {
    this.selectedDateRange[0] = value;
  }

  /**
   * this method toggles checkbox to indicate interest
   *
   * @param {String} userId
   */
  toggleInterest(userId) {
    this.filterRegistry(this.interestedRegister, this.interestedStatus, 'interested', userId);
  }

  /**
  * getCheckedSkills
  *
  * gets the checkedSkills attribute and returns it as an Observable
  *
  * @return Observable containing checkedSkills array
  */
  getCheckedSkills(): Observable<any> {
    return Observable.of(this.checkedSkills);
  }

  /**
  * getCheckedStatuses
  *
  * gets the checkedStatuses attribute and returns it as an Observable
  *
  * @return Observable containing checkedStatuses array
  */
  getCheckedStatuses(): Observable<any> {
    return Observable.of(this.checkedStatuses);
  }

  /**
  *  getAllRequestByStatus
  *
  *  gets all the request that matches the selected status
  *
  *  @return Observable containing  array
  */
  getAllRequestsByStatus(status): Observable<any> {
    return this.filterRegistry(this.statusRegister, this.checkedStatuses, 'status', status);
  }

  /**
  * getSelectedDateRange
  *
  * gets the selectedDateRange attribute and returns it as an Observable
  *
  * @return Observable containing selectedDateRange value
  *
  * @memberOf FilterService
  */
  getSelectedDateRange(): Observable<any> {
    return Observable.of(this.selectedDateRange);
  }

  /**
  * gets the interestedStatus attribute and returns it as an Observable
  *
  * @return Observable containing interestedStatus array
  */
  getInterestedStatus(): Observable<any> {
    return Observable.of(this.interestedStatus);
  }
}