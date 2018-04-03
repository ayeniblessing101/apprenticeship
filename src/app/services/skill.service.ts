import { Message } from './../interfaces/message.interface';
import { Injectable } from '@angular/core';
import { HttpService as Http } from './http.service';
import { BaseService } from './base.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class SkillService extends BaseService {
  private apiBaseUrl = environment.apiBaseUrl;  // URL to web API
  private skills: any;

  /**
   * Create a new skill
   *
   * @param {string} name name of new skill
   *
   * @return {Reponse} object containing details of the just created skill
   */
  addSkill(name: string) {
    return this.http.post(`${this.apiBaseUrl}/v2/skills`, { name })
      .map(this.handleResponse)
      .catch(this.handleError);
  }

  /**
   * Return all skills in the database that are enabled.
   * Meaning skills that are not been disabled by an admin user.
   *
   * @param params skills parameter.
   *
   * @return Observable collection of skills
   */
  getSkills(params): Observable<any> {
    if (!this.skills) {
      this.skills = this.http
        .get(`${this.apiBaseUrl}/v2/skills?isTrashed=${params.includeTrashed}`)
        .map((response: Response) => response.json())
        .publishReplay(1)
        .refCount()
        .catch(this.handleError);
    }
    return this.skills;
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
      .catch(this.handleError);
  }

  /**
  * Add a new skill to user skills
  *
  * @param {Object} skillId - the id of the skill to be added
  * @return Observable of the newly added user skill
  */
  addUserSkill(userId, skillId): Observable<any> {
    return this.http
      .post(`${this.apiBaseUrl}/v2/users/${userId}/skills`, { skill_id: skillId })
      .catch(this.handleError);
  }

  /**
   * Get reports of status counts for all skills requested
   * within a period and location
   *
   * @param  {object} params All skills requested within that period and count
   *
   * @return {Observable} Observable with the requests based on location, start date and end date
   */
  getSkillStatusCount(params: {}) {
    return this.http
      .get(`${this.apiBaseUrl}/v2/skill/status-report?${this.getEncodedParameters(params)}`)
      .map(this.handleResponse)
      .map((res: Response) => res.json())
  }

   /**
   * Update the name of a particular skill
   *
   * @param {Number} skillId - the id of the skill.
   * @param {String} skillName - the name of the skill to be updated.
   *
   * @return Observable of the newly added user skill
   */
  updateSkillName(skillName, skillId): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/v1/skills/${skillId}`,
                         { name: skillName })
      .catch(
      error => Observable.throw(error.json()),
    );
  }


   /**
   * Update the status of a particular skill.
   *
   * @param {Number} skillId - the id of the skill.
   * @param {String} active - the skill status.
   *
   * @return Observable of the newly added user skill
   */
  updateSkillStatus(skillId, status) {
    return this.http.patch(`${this.apiBaseUrl}/v2/skills/${skillId}/update-status`,
                           { status })
      .catch(
      error => Observable.throw(error.json()),
      );
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

  /**
   * Handle response from server.
   *
   * @param {Response} res - created skill
   *
   * @returns {object} - response object of created skill
   *
   */
  private handleResponse(res: Response) {
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
  private handleError(error: Response | any) {
    const message = error.json().message;
    return Observable.throw(message);
  }
}
