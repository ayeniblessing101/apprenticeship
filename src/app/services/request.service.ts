import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RequestService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: Http) { }

  /**
   * Return details of a particular request
   *
   * @return Observable containing details of request
   */
  getRequestDetails() {
    return this.http.get(`${this.apiBaseUrl}requests/1`)
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
  getRequests(limit): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/requests?limit=limit`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Create a new mentorship request
   *
   * @param Object Data containing details of mentorship request
   *
   * @return Reponse object
   */
  requestMentor(data) {
    return this.http.post(`${this.apiBaseUrl}requests`, data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Return data as JSON
   *
   * @param Response res an Observable
   *
   * @return Object containing data from Observable
   */
  extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }

  /**
   * Handle errors
   *
   * @param Response http error
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
}
