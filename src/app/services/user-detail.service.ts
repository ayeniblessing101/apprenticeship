import { Injectable, Input } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserDetailService {
  @Input() menteeId: String;
  private baseUrl: String;
  private userEndpoint: String;
  private apiToken: String;

  constructor(private http: Http) {
    this.apiToken = Cookie.get('jwt-token');
    this.baseUrl = environment.apiGateway;
    this.userEndpoint = '/api/v1/users/';
  }
  
  getUserDetails(userId: String) {
    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiToken}`
    });
    const options: RequestOptions = new RequestOptions({ headers: headers });

    return this.http.get(`${this.baseUrl}${this.userEndpoint}${userId}`, options)
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
  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  /**
   * Handle errors
   *
   * @param Response http error
   *
   * @return ErrorObservable
   */
  private handleError(error: Response | any) {
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