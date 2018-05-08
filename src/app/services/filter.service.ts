import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Response } from '@angular/http';
import { HttpService as Http, HttpService } from './http.service';
import { environment } from '../../env';
import 'rxjs/add/operator/map';
import 'rxjs/'
import { BaseService } from './base.service';

@Injectable()
export class FilterService extends BaseService {
  private apiBaseUrl = environment.apiBaseUrl;  // URL to web API
  // Publishes new result to other observables and subscribes to incoming results
  statusResult = new Subject<Object[]>();
  skills: any;
  filters = {
    category: 'myRequests',
    type: [],
    ratings: [],
    locations: [],
    skills: [],
    lengths: [],
  };

  /**
   * Return a unique list of all skills that have create-request
   *
   * @return Observable collection of skills
   */
  getSkillsWithRequests(): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/v2/skills/request-skills`)
      .map(this.handleResponse)
      .catch(this.handleError);
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
