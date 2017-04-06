import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SkillService {
  private apiBaseUrl = environment.apiBaseUrl;  // URL to web API

  constructor(private http: Http) { }

  /**
   * Return all skills in the database
   *
   * @return Observable collection of skills
   */
  getSkills(): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/skills`)
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
  private extractData(res: Response) {
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
