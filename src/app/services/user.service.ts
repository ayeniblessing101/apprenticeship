import { Injectable } from '@angular/core';
import { HttpService as Http } from './http.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserService {
  private apiBaseUrl: string = environment.apiBaseUrl;

  constructor(
    private http: Http,
    private database: AngularFireDatabase,
  ) {
  }

  /**
   * Returns the logged in user's information
   *
   * @param String id number of the logged in user
   *
   * @return Observable containing the user's info
   */
  getUserInfo(userId: string): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/users/${userId}`)
      .map(this.extractResponse)
      .catch(this.handleError);
  }

   /**
    * Return data as JSON
    *
    * @param Response res an Observable
    *
    * @return Object containing data from Observable
    */
   extractResponse(res: Response) {
    return res.json();
  		  
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
