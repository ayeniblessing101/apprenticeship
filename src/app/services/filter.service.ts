import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Response, Http } from '@angular/http';
import { environment } from '../../env';
import 'rxjs/add/operator/map';
import 'rxjs/'

@Injectable()
export class FilterService {
  private apiBaseUrl = environment.apiBaseUrl;  // URL to web API
  // Publishes new result to other observables and subscribes to incoming results
  statusResult = new Subject<Object[]>();
  skills: any;
  filters = {
    category: ['recommended'],
    type: [],
    ratings: [],
    locations: [],
    skills: [],
    lengths: [],
  };

  constructor(private http: Http) {}

  /**
   * Return a unique list of all skills that have create-request
   *
   * @return Observable collection of skills
   */
  getSkillsWithRequests(): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/v2/skills/request-skills`)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw(error.json()));
  }

  /**
   * This method updates the filters object
   *
   * @param {Object} filters - Object containing filter data
   * @return {void}
   */
  setFilters(filters): void  {
    this.filters = filters;
  }

  /**
   * This method returns the currently active filters.
   *
   * @return {Object} filter data
   */
  getFilters() {
    return this.filters;
  }
}
