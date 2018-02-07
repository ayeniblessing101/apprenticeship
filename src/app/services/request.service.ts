import { Injectable } from '@angular/core';
import { HttpService as Http } from './http.service';
import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class RequestService {
  private apiBaseUrl: string = environment.apiBaseUrl;
  private statuses: any;
  updatePendingPoolRequestsTable = new Subject<any>();
  constructor(
    private http: Http,
    private userService: UserService,
  ) { }

  /**
   * Return details of a particular request
   *
   * @param requestId the mentorship request Id
   *
   * @return Observable containing details of request
   */
  getRequest(requestId: number) {
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
   * Return latest mentorship create-request
   *
   * @param Number Limit number of create-request to return
   * @param Number Page current pagination page
   * @param Object Params get parameters
   *
   * @return Observable containing latest create-request
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
  getEncodedParameters(params) {
    let paramValues = new URLSearchParams();
    for (let key in params) {
      paramValues.set(key, params[key])
    }
    return paramValues.toString();
  }


  /**
   * Return latest mentorship create-request
   *
   * @param String the status parameter to search for
   *
   * @return Observable containing matching create-request
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
   * Create a mentorship request initiated by mentor
   *
   * @param mentorshipDetails Data containing details of mentorship request
   *
   * @return {Reponse} object containing the created request
   */
  createRequest(mentorshipDetails) {
    return this.http.post(`${this.apiBaseUrl}/v2/requests`, mentorshipDetails)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Match a mentee with a mentor
   *
   * @param {Number} requestId
   *
   * @return {Observable} containing all open create-request
   */
  matchMenteeRequest(requestId: Number, requestUpdate: Object): Observable<any> {
    return this.http
      .patch(`${this.apiBaseUrl}/v1/requests/${requestId}/update-mentor`, requestUpdate)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Indicate interest in mentorship request
   *
   * @param id the mentorship request Id
   *
   * @return Observable containing the http response
   */
  indicateInterest(id: number): Observable<any> {
    return this.http.patch(`${this.apiBaseUrl}/v2/requests/${id}/indicate-interest`, null)
      .catch(this.handleError);
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
      location: this.userService.getCurrentUser().location,
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
   * @param {Object} reason the reason for cancelling a request
   *
   * @return Observable
   */
  cancelRequest(id: number, reason?) {
    return this.http
      .patch(`${this.apiBaseUrl}/v2/requests/${id}/cancel-request`, reason)
      .catch(this.handleError);
  }

  /**
   * Send PATCH request to withdraw a users interest in a MentorshipRequest
   *
   * @param (Number) - id the id of the Mentorship request
   *
   * @return Observable
   */
  withdrawInterest(requestId: number) {
    return this.http
      .patch(`${this.apiBaseUrl}/v2/requests/${requestId}/withdraw-interest`, {})
      .catch(this.handleError);
  }

  /**
   * Get report create-request
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
   * Get unmatched create-request
   *
   * @param {Object} options key value pairs for additional query
   * @return Observable containing unmatched create-request by location and period
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
   * Retrieves mentorship create-request with different possible filters
   * e.g if we choose to filter by status, the value can either be
   * open, completed, cancelled, matched
   *
   * @param {String} type what filter to use to sieve mentorship create-request
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
   * Returns a users completed create-request
   *
   * @return Observable containing completed create-request
   */
  getUserHistory(): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/v2/requests/history?&`)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw(error.json()),
      );
  }

  /**
   * Return latest in progress mentorship create-request for v2
   *
   * @param {void}
   *
   * @return Observable containing latest create-request
   */
  getInProgressRequests(): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/v2/requests/in-progress`)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw(error.json()),
      );
  }

  /**
   * Get pending mentorship reqeusts
   *
   * @return Observable with pending create-request
   */
  getPendingRequests() {
    return this.http
      .get(`${this.apiBaseUrl}/v2/requests/pending`)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw(error.json()),
    );
  }

  /**
   * Send request to accept an interested mentor
   *
   * @param {number} requestId - a mentorship request id
   * @param {Object} data - json object containing mentor name and id
   *
   * @return {Observable} response object
   */
  acceptInterestedMentor(requestId, data) {
    return this.http
      .patch(`${this.apiBaseUrl}/v2/requests/${requestId}/accept-mentor`, data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw(error.json()));
  }

  /**
   * Send request to reject an interested mentor
   *
   * @param {number} requestId - a mentorship request id
   * @param {Object} data - json object containing mentor name and id
   *
   * @return {Observable} response object
   */
  rejectInterestedMentor(requestId, data) {
    return this.http
      .patch(`${this.apiBaseUrl}/v2/requests/${requestId}/reject-mentor`, data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw(error.json()));
  }

  /**
   * Get statistics of the different request based on status
   *
   * @param  {{object}} params the different statuses
   *
   * @return Observable with the requests based on status
   */
  getRequestStatistics(params: {}): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/v2/requests/status-statistics?${this.getEncodedParameters(params)}`)
      .map((res: Response) => res.json())
  }

  /**
   * retrieves sessions for a request
   *
   * @param {number} requestId - request id
   *
   * @return {observable} sessions
   */
  getRequestSessions(requestId: number): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/v2/requests/${requestId}/sessions`)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  /**
   * Update request in pending pool after after cancel a request,
   * withdrawing interest in a request and accepting or rejecting mentor
   *
   * @return {void}
   */
  updatePendingPoolRequests() {
    this.updatePendingPoolRequestsTable.next();
  }
}

