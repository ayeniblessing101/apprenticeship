import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to format request skills into an array
 */

@Pipe({
  name: 'requestSkill',
})
export class RequestSkillPipe implements PipeTransform {
  /**
  * Combine primary or secondary skills in one string.
  *
  * @param {array} requestSkills - Request Skills
  * @param {string} skillType - Type of skills to combine
  *
  * @return {string} - Formatted string
  */
  transform(requestSkills: any[], skillType): any {
    const skills = [];
    for (const skill of requestSkills) {
      if (skill.type === skillType) {
        skills.push(skill.name);
      }
    }

    if (skills.length === 0) {
      return `None`;
    }
    return skills.join(', ');
  }
}
