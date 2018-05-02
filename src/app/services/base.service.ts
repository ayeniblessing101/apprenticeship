import { Injectable } from '@angular/core';
import { HttpService as Http } from './http.service';
import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';


@Injectable()
export class BaseService {

  constructor(
    protected http: Http,
  ) {}

  /**
   * Return encoded GET querystring
   *
   * @param Object data parameters
   *
   * @return String
   */
  getEncodedParameters(params) {
    const paramValues = new URLSearchParams();
    for (const key in params) {
      if (key) {
        paramValues.set(key, params[key])
      }
    }
    return paramValues.toString();
  }

  /**
   * Handle response from server.
   *
   * @param {Response} res - response object
   *
   * @returns {object} - response object
   *
   */
  handleResponse(res: Response) {
    const response = res.json();
    return response || {};
  }

  /**
   * Handle errors from server
   *
   * @param {Response} error http error
   *
   * @return {Observable} ErrorObservable
   */
  handleError(error: Response | any) {
    const message = error.json().message;
    return Observable.throw(message);
  }
}
