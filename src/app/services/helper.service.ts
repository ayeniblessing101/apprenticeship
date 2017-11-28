import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {
  filters = {
    category: ['recommended'],
    type: [],
    ratings: [],
    locations: [],
    skills: [],
    lengths: [],
  };

  constructor() {}

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
   * This method retrieves information
   * for the current user
   *
   * @return {Object} object of user's information
   */
  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  /**
   * This method updates the filters object
   *
   * @param {Object} filters - Object containing filter data
   * @return {void}
   */
  setFilters(filters): void  {
    this.filters = filters;
  }

  /**
   * This method returns the currently active filters.
   *
   * @return {Object} filter data
   */
  getFilters() {
    return this.filters;
  }
}
