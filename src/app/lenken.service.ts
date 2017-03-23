import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LenkenService {
  private lenkenBaseUrl = 'http://private-729ea-lenken.apiary-mock.com';  // URL to web API

  constructor(private http: Http) { }

  getSkills(): Observable<any> {
    return this.http
      .get(this.lenkenBaseUrl + '/skills')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStatus(): Observable<any> {
    return this.http
      .get(this.lenkenBaseUrl + '/status')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getRequests(limit): Observable<any> {
    return this.http
      .get(this.lenkenBaseUrl + '/requests?limit=' + limit)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: Response | any) {
    // We should use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
