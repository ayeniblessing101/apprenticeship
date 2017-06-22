import { Injectable } from '@angular/core';
import { HttpService as Http } from './http.service';
import { Response } from '@angular/http';
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
   * Return all mentor skills in the database
   *
   * @param {String} id - id of the currently logged in user
   *
   * @return Observable collection of mentor skills
   */
  getUserSkills(id): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/skills?id=${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Creates a new skill
   *
   * @param {Object} data - containing name of the skill to be created
   * @return Observable of the newly created skill
   */
  createSkill(data: Object): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/skills`, data)
      .map(this.extractData)
      .catch(
        error => Observable.throw(error.json()),
      );
  }

  /**
   * Edit an existing skill
   *
   * @param {Number} id - id of the skill to be edited
   * @param data the update data
   *
   * @return Observable of the newly edited skill
   */
  editSkill(id: number, data): Observable<any> {
    return this.http
      .put(`${this.apiBaseUrl}/skills/${id}`, data)
      .map(this.extractData)
      .catch(
        error => Observable.throw(error.json()),
      );
  }

  /**
   * Deletes an existing skill
   *
   * @param {integer} id - id of the skill to be deleted
   * @return Observable object
   */
  deleteSkill(id) {
    return this.http
      .delete(`${this.apiBaseUrl}/skills/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

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
