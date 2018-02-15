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
      message: error.json().message,
    };
    return Observable.of(err);
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
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

}
