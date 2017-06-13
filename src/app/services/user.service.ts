import { Injectable } from '@angular/core';
import { HttpService as Http } from './http.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AngularFire} from 'angularfire2';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
  private apiBaseUrl: string = environment.apiBaseUrl;
  private database;

  constructor(
    private http: Http,
    private firebase: AngularFire,
  ) {
    this.database = firebase.database;
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
      .map(this.extractData)
      .catch(this.handleError);
   }

   /**
    * Adds the logged in user's slack handle to
    * Lenken Api /messages/slack/ endpoint
    */
   addUserSlackHandle(slackHandle: string): Observable<any> {
     return this.http.post(`${this.apiBaseUrl}/messages/slack`, {
       slack_handle: slackHandle})
       .map(this.extractData)
       .catch(this.handleError);
   }

   /**
    * Sets the firebase User's slackHandle key
    * value pair when the slackHandle
    * has been supplied
    *
    * @param {String} userId - the user id of the currently
    * logged in user
    */
   addSlackHandleStatus(userId) {
    const user = {slackHandle: true};
    return this.database
      .object(`/hasSlackHandle/${userId}`)
      .set(user)
      .then(this.handleSuccess)
      .catch(this.handleFirebaseError);
   }

   /**
    * Retrieves the Logged in user information and
    * checks if the slack handle key value pair is set
    * on firebase
    *
    * @param {String} userId - the user id of the currently
    * logged in user
    */
   checkSlackHandleStatus(userId) {
     return this.database.object(`/hasSlackHandle/${userId}`);
   }

   /**
    * handleSuccess method
    *
    * @private
    * @return {String} return a string message
    * @memberOf UserService
    */
   private handleSuccess(): String {
     return 'write successful';
   }

   /**
    *  handleFirebaseError method
    *
    * @private
    * @param {*} error error parameter
    * @return {*} return the error parameter
    * @memberOf UserService
    */
   private handleFirebaseError(error: any): any {
    return error;
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
    body.data.request_count = body.request_count;
    body.data.skills = body.skills;

    return body.data || [];
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
