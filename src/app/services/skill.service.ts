import { Injectable } from '@angular/core';
import { HttpService as Http } from './http.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class SkillService {
  private apiBaseUrl = environment.apiBaseUrl;  // URL to web API
  private skills: any;

  constructor(private http: Http) { }

  /**
   * Return all skills in the database
   *
   * @return Observable collection of skills
   */
  getSkills(): Observable<any> {
    if (!this.skills) {
      this.skills = this.http
        .get(`${this.apiBaseUrl}/v1/skills`)
        .map(this.extractData)
        .publishReplay(1)
        .refCount()
        .catch(this.handleError);
    }

    return this.skills;
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
      .get(`${this.apiBaseUrl}/v1/skills?id=${id}`)
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
    return this.http.post(`${this.apiBaseUrl}/v1/skills`, data)
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
      .put(`${this.apiBaseUrl}/v1/skills/${id}`, data)
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
      .delete(`${this.apiBaseUrl}/v1/skills/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }

   /**
   * Deletes an existing user skill
   *
   * @param {integer} id - id of the user skill to be deleted
   * @return Observable object
   */
  deleteUserSkill(userId, skillId) {
    return this.http
      .delete(`${this.apiBaseUrl}/v2/users/${userId}/skills/${skillId}`)
      .catch(
        error => Observable.throw(error.json()),
      );
  }

   /**
   * Add a new skill to user skills
   *
   * @param {Object} skillId - the id of the skill to be added
   * @return Observable of the newly added user skill
   */
  addUserSkill(userId, skillId): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/v2/users/${userId}/skills`,
      { skill_id: skillId })
      .catch(
      error => Observable.throw(error.json()),
    );
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

  /**
   *  extracts the names of skills from an array of skill objects
   *
   *  @param {Array} arrayOfSkills
   *  @param {String} skilltype
   *
   *  @return an array of names of skills filtered by skill type
   */
  extractSkills(arrayOfSkills: any[], skilltype?: string): string[] {
    if (skilltype !== undefined) {
      arrayOfSkills = arrayOfSkills.filter((skillObj) => {
        return skillObj.type === skilltype;
      });
    }

    return arrayOfSkills.map(skill => skill.name);
  }

  /**
   * This takes an array of skills then joins them using a comma
   *
   * @param {Array} arrayOfSkillsNames
   * @param {String} skilltype
   *
   * @return {String} formatted string of skills joined from an array
   */
  joinSkills(arrayOfSkillsNames: any[], skilltype: string): string {
    return this.extractSkills(arrayOfSkillsNames, skilltype).join(', ');
  }
}
