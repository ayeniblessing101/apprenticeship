import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  constructor() { }

  /**
  *  extracts the names of skills from an array of skill objects
  *
  *  @param {Array} arrayOfSkills
  *
  *  @return an array of names of skills
  */
  extractSkills(arrayOfSkills: any[]): string[] {
    return arrayOfSkills.map(skill => skill.name);
  }

  /**
  * This takes an array of skills then joins them using a comma
  *
  * @param {Array} arrayOfSkillsNames
  *
  * @return {String} formatted string of skills joined from an array
  */
  joinSkills(arrayOfSkillsNames: any[]): string {
    return this.extractSkills(arrayOfSkillsNames).join(', ');
  }
}
