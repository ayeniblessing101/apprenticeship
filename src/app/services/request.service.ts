import { Injectable } from '@angular/core';
import { HttpService as Http } from './http.service';
import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { HelperService as Helper } from './helper.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class RequestService {
  private apiBaseUrl: string = environment.apiBaseUrl;

  constructor(
    private http: Http,
    private helper: Helper,
  ) { }

  /**
   * Return details of a particular request
   *
   * @param requestId the mentoship request Id
   *
   * @return Observable containing details of request
   */
  getRequestDetails(requestId: number) {
    return this.http.get(`${this.apiBaseUrl}/requests/${requestId}`)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  /**
   * Return status of request e.g Open, Canceled, Closed
   *
   * @return Observable containing collection of possible statuses
   */
  getStatus(): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/status`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Return latest mentorship requests
   *
   * @param Number Limit number of requests to return
   *
   * @return Observable containing latest requests
   */
  getRequests(limit: number): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/requests?limit=${limit}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Return latest mentorship requests
   *
   * @param String the status parameter to search for
   *
   * @return Observable containing matching requests
   */
  getRequestsByStatus(status): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/requests?status=${status}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Return mentorship requests for the logged in user
   *
   * @param {Number} limit number of requests to return
   *
   * @return {Observable} containing the mentee requests
   */
  getMenteeRequests(limit: number): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/requests?self=true&limit=${limit}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Create a new mentorship request
   *
   * @param {Object} Data containing details of mentorship request
   *
   * @return {Reponse} object
   */
  requestMentor(data) {
    const formattedData = this.formatRequestForm(data);
    return this.http.post(`${this.apiBaseUrl}/requests`, formattedData)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Return all open mentorship requests
   *
   * @param {Number} limit number of requests to return
   *
   * @return {Observable} containing all open requests
   */
  getMentorRequests(limit): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/requests?mentor=true&limit=${limit}`)
    .map(this.extractData)
    .catch(this.handleError);
  }

  /**
   * Match a mentee with a mentor
   *
   * @param {Number} requestId
   *
   * @return {Observable} containing all open requests
   */
  matchMenteeRequest(requestId: Number, requestUpdate: Object): Observable<any> {
    return this.http
      .patch(`${this.apiBaseUrl}/requests/${requestId}/update-mentor`, requestUpdate)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Update a mentorship request interested field
   *
   * @param id the mentorship request Id
   * @param data the update data
   *
   * @return Observable containing the updated request
   */
  updateMentorRequestInterested(id: number, data): Observable<any> {
    return this.http.patch(`${this.apiBaseUrl}/requests/${id}/update-interested`, data);
  }


  /**
   * Format Request Form data
   *
   * @param {Object} formValue
   *
   * @return {Object}
   */
  formatRequestForm(formValue) {
    const result = {
      title: formValue.title,
      description: formValue.description,
      primary: formValue.requiredSkills,
      secondary: formValue.otherSkills,
      duration: formValue.duration,
      location: this.helper.getTimeZone(),
      pairing: {
        start_time: formValue.timeControlStart,
        end_time: formValue.timeControlEnd,
        days: formValue.selectedDays,
        timezone: formValue.timeZone,
      },
    };

    return result;
  }

  /**
   * Send PUT request to update mentorship request status
   *
   * @param {Number} id the id of the request
   * @param {Object} data the update data
   */
  updateRequestStatus(id, data) {
    return this.http.put(`${this.apiBaseUrl}/requests/${id}`, data)
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Send PATCH request to cancel mentorship request status
   *
   * @param {Number} id the id of the request
   * @param {Object} data the update data
   */
  cancelRequest(id) {
    const data = { id };
    return this.http.patch(`${this.apiBaseUrl}/requests/${id}/cancel-request`, data)
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Get report requests
   *
   * @param period {String | Number}, location {String}
   * @return Observable containing reports by location and period
   */
  getReports(options: {}): Observable<any> {
    let params = new URLSearchParams();
    for (let key in options) {
        params.set(key, options[key]);
    }

    return this.http
      .get(`${this.apiBaseUrl}/reports?${params.toString()}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Return data as JSON
   *
   * @param {Response} res an Observable
   *
   * @return {Object} containing data from Observable
   */
  extractData(res: Response) {
    const body = res.json();
    return body.data || [];
  }

  /**
   * Handle errors
   *
   * @param {Response} http error
   *
   * @return ErrorObservable
   */
  handleError(error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);

      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }

  /**
   * Retrieves mentorship requests with different possible filters
   * e.g if we choose to filter by status, the value can either be
   * open, closed, cancelled, matched
   *
   * @param {String} type what filter to use to sieve mentorship requests
   * @param {String} value actual value of filter
   */
  getRequestsByFilter(type, value): Observable<any> {
    switch (type) {
      case 'status':
      default:
        return this.getRequestsByStatus(value);
    }
  }
}
