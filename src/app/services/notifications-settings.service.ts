import { Injectable } from '@angular/core';
import { HttpService as Http } from './http.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class NotificationSettingsService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: Http) { }

  /**
   * Get notification settings of a particular user
   *
   * @param {string} userId unique id of the user
   *
   * @return Observable containing settings of the user
   */
  getUserSettings(userId: string): Observable<any> {
    return this.http.get(
      `${this.apiBaseUrl}/user/${userId}/settings`
    )
      .map(this.extractResponse)
      .catch(this.handleError);
  }

  /**
   * Updates user notification settings
   *
   * @param {string} settingId unique id of the setting
   * @param {string} userId    unique id of the user
   * @param {object} values    request payload to the server
   *
   * @returns {Observable<any>} contains response message
   */
  updateUserSettings(userId, settingId, values): Observable<any> {
    return this.http.put(
      `${this.apiBaseUrl}/user/${userId}/settings/${settingId}`,
      values
    )
      .map(this.extractResponse)
      .catch(this.handleError);
  }

  /**
   * Extract response data
   *
   * @param {Response} response the response object
   *
   * @returns {JSON} json object of response
   */
  extractResponse(response: Response) {
    return response.json() || [];
  }

  /**
   * Handle errors
   *
   * @param {Response} error the response error received
   *
   * @return ErrorObservable the Observable response error
   */
  handleError(error: Response | any) {
    return Observable.throw(error.json().message || '');
  }
}
