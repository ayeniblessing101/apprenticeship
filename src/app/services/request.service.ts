import { Injectable } from '@angular/core';
import { HttpService as Http } from './http.service';
import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { HelperService as Helper } from './helper.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class RequestService {
  private apiBaseUrl: string = environment.apiBaseUrl;
  private statuses: any;
  constructor(
    private http: Http,
    private helper: Helper,
  ) { }

  /**
   * Return details of a particular request
   *
   * @param requestId the mentorship request Id
   *
   * @return Observable containing details of request
   */
  getRequestDetails(requestId: number) {
    return this.http.get(`${this.apiBaseUrl}/v1/requests/${requestId}`)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  /**
   * Return status of request e.g Open, Canceled, Completed
   *
   * @return Observable containing collection of possible statuses
   */
  getStatus(): Observable<any> {
    if (!this.statuses) {
      this.statuses = this.http
        .get(`${this.apiBaseUrl}/v1/status`)
        .map(this.extractData)
        .publishReplay(1)
        .refCount()
        .catch(this.handleError);
    }

    return this.statuses
  }

  /**
   * Return latest mentorship requests
   *
   * @param Number Limit number of requests to return
   * @param Number Page current pagination page
   * @param Object Params get parameters
   *
   * @return Observable containing latest requests
   */
  getRequests(limit: number, page = null, params = null): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/v2/requests/pool?limit=${limit}&page=${page}&${this.getEncodedParameters(params)}`)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw(error.json()),
      );
  }

  /**
   * Return encoded GET querystring
   *
   * @param Object data parameters
   *
   * @return String
   */
  getEncodedParameters(params){
    let paramValues = new URLSearchParams();
    for(let key in params){
      paramValues.set(key, params[key])
    }
    return paramValues.toString();
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
      .get(`${this.apiBaseUrl}/v1/requests?status=${status}`)
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
    return this.http.post(`${this.apiBaseUrl}/v1/requests`, formattedData)
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
      .patch(`${this.apiBaseUrl}/requests/${requestId}/v1/update-mentor`, requestUpdate)
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
    return this.http.patch(`${this.apiBaseUrl}/v1/requests/${id}/update-interested`, data);
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
      location: this.helper.getCurrentUser().location,
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
    return this.http.put(`${this.apiBaseUrl}/v1/requests/${id}`, data)
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Send PATCH request to cancel mentorship request
   *
   * @param {Number} id the id of the request
   * @param {String} reason the reason for cancelling a request
   */
  cancelRequest(id: number, reason = '') {
    return this.http.patch(
      `${this.apiBaseUrl}/v1/requests/${id}/cancel-request`, { reason })
      .map(res => res.json())
      .catch(error => Observable.throw(error.json().message));
  }

  /**
   * Get report requests
   *
   * @param {Object} options key value pairs for additional query
   * @return Observable containing reports by location and period
   */
  getReports(options: {}): Observable<any> {
    const params = new URLSearchParams();
    for (let key in options) {
      params.set(key, options[key]);
    }

    return this.http
      .get(`${this.apiBaseUrl}/v1/reports?${params.toString()}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  /**
   * Get unmatched requests
   *
   * @param {Object} options key value pairs for additional query
   * @return Observable containing unmatched requests by location and period
   */
  getUnmatchedRequests(options: {}): Observable<any> {
    const params = this.getEncodedParameters(options);
    return this.http
      .get(`${this.apiBaseUrl}/v1/reports/unmatched-requests?${params}`)
      .map((res: Response) => res.json())
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
   * open, completed, cancelled, matched
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

  /**
   * Request the extension of a mentorship period
   *
   * @param {number} requestId the request id
   *
   * @return Object containing response
   */
  requestExtension(requestId: number) {
    return this.http.put(
      `${this.apiBaseUrl}/v1/requests/${requestId}/extend-mentorship`,
      {})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  /**
   * Send request to approve mentorship extension request
   *
   * @param {number} requestId the request id
   *
   * @return Object containing response
   */
  approveExtensionRequest(requestId: number) {
    return this.http.patch(
      `${this.apiBaseUrl}/v1/requests/${requestId}/approve-extension`,
      {})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  /**
   * Send request to reject mentorship extension request
   *
   * @param {number} requestId the request id
   *
   * @return Object containing response
   */
  rejectExtensionRequest(requestId: number) {
    return this.http.patch(
      `${this.apiBaseUrl}/v1/requests/${requestId}/reject-extension`,
      {})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  /**
   * Returns a users completed requests
   *
   * @return Observable containing completed requests
   */
  getUserHistory(): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/v2/requests/history?&`)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw(error.json()),
      );
  }

  /**
   * Return latest in progress mentorship requests for v2
   *
   * @param {void}
   *
   * @return Observable containing latest requests
   */
  getInProgressRequests(): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/v2/requests/in-progress`)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw(error.json()),
      );
    }
}
