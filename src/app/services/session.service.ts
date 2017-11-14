import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService as Http } from './http.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Session } from '../interfaces/session.interface';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SessionService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: Http) {}

  /**
   * logs a session
   *
   * @param {String} - requestId
   * @return {Observable} sessions
   */
  logSession(data: Session): Observable<any> {
    return this.http
      .post(`${this.apiBaseUrl}/v1/sessions`, data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * retrieves sessions for a request
   *
   * @param {Number} - requestId
   * @return {Observable} sessions
   */
  getSessions(requestId: number, include: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/v1/sessions/${requestId}?include=${include}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * approves a session
   *
   * @param {Number} - requestId
   * @return {Observable} sessions
   */
  approveSession(sessionId: number, payload: any): Observable<any> {
    return this.http
      .patch(`${this.apiBaseUrl}/v1/sessions/${sessionId}/approve`, payload)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * rejects a session
   *
   * @param {Number} - requestId
   * @return {Observable} sessions
   */
  rejectSession(sessionId: number, payload: any): Observable<any> {
    return this.http
      .patch(`${this.apiBaseUrl}/v1/sessions/${sessionId}/reject`, payload)
      .map((response) => response.json())
      .catch((error) => Observable.throw(error.json().message));
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
      .catch((error) => {
        return Observable.throw(error.json());
      });
  }

  /**
   * extracts actual data from Response
   *
   * @param {Response} - res
   * @return {Object} data
   */
  extractData(res: Response): any[] {
    const body = res.json();
    return body.data || [];
  }

  /**
   * handles errors if any
   *
   * @param {Reponse} - err
   * @return {Observable} err
   */
  handleError(error: Response | any): Observable<any> {
    const err = {
      status: error.status,
      message: error.json().message
    };
    return Observable.of(err);
  }

}
