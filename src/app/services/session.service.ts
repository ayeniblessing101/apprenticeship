import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService as Http } from './http.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Session } from '../interfaces/session.interface';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { BaseService } from './base.service';

@Injectable()
export class SessionService extends BaseService {
  private apiBaseUrl = environment.apiBaseUrl;

  /**
   * Creates a session for a given request.
   *
   * @param {String} - requestId
   * @param {object} - requestData
   *
   * @return {Observable} sessions
   */
  createSession(requestData: Object, requestId) {
    return this.http.post(`${this.apiBaseUrl}/v2/requests/${requestId}/sessions`, requestData)
      .map(this.handleResponse);
  }

  /**
   * Logs a session for a request.
   *
   * @param {String} - requestId
   *
   * @return {Observable} sessions
   */
  logSession(data: Session, requestId, sessionId): Observable<any> {
    return this.http
      .patch(`${this.apiBaseUrl}/v2/requests/${requestId}/sessions/${sessionId}`, data)
      .map(this.handleResponse)
      .catch(this.handleError);
  }

  /**
   * retrieves sessions for a request
   *
   * @param {Number} - requestId
   *
   * @return {Observable} sessions
   */
  getSessions(requestId: number, include: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/v1/sessions/${requestId}?include=${include}`)
      .map(this.handleResponse)
      .catch(this.handleError);
  }

  /**
   * approves a session
   *
   * @param {Number} - requestId
   *
   * @return {Observable} sessions
   */
  approveSession(sessionId: number, payload: any): Observable<any> {
    return this.http
      .patch(`${this.apiBaseUrl}/v1/sessions/${sessionId}/approve`, payload)
      .map(this.handleResponse)
      .catch(this.handleError);
  }

  /**
   * Confirms an already logged session.
   *
   * @param sessionId - ID of the session
   * @param payload - Payload object containing the confirmaiton details
   *
   * @returns {Observable} - The confirmed session details
   */
  confirmSession(sessionId: number, payload: any): Observable<any> {
    return this.http
      .patch(`${this.apiBaseUrl}/v2/sessions/${sessionId}/confirm`, payload)
      .map(this.handleResponse)
      .catch(this.handleError)
  }

  /**
   * rejects a session
   *
   * @param {Number} - requestId - id of current request
   *
   * @param {String} - userId - id of user
   *
   * @return {Observable} sessions
   */
  rejectSession(sessionId: number, userId: any): Observable<any> {
    return this.http
      .patch(`${this.apiBaseUrl}/v1/sessions/${sessionId}/reject`, { user_id: userId })
      .map(this.handleResponse)
      .catch(this.handleError);
  }

  /**
   * Sends the rated sessions data to a given endpiont
   *
   * @param ratings{Object} - object containing data on sessions rated
   * @return {Observable} obeservable object
   */
  rateSession(ratings): Observable<any> {
    return this.http
      .post(`${this.apiBaseUrl}/v1/ratings`, ratings)
      .map((res) => {
        return res.json().rating;
      })
      .catch(this.handleError);
  }

  /**
   * Get single session.
   *
   * @param {number} sessionId - id of the session
   *
   * @return {observable} observable containing single session
   */
  getSession(sessionId: number): Observable <any> {
    return this.http
    .get(`${this.apiBaseUrl}/v2/sessions/${sessionId}`)
    .map(this.handleResponse)
    .catch(this.handleError);
  }

  /**
   * Retrieve missed, completed and upcoming session dates for a request.
   *
   * @param {number} requestId - request id
   *
   * @return {observable} sessions
   */
  fetchSessionDates(requestId: number): Observable <any> {
    return this.http.get(`${this.apiBaseUrl}/v2/requests/${requestId}/sessions/dates`)
      .map(this.handleResponse)
      .catch(this.handleError);
  }
}
