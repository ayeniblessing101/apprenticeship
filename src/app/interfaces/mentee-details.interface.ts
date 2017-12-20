import { Skill } from './skill.interface';

/**
 * @interface MenteeDetails
 * Blueprint for mentee details
 */
export interface IMenteeDetails {
  id: string,
  name: string,
  imgUrl: string,
  totalRequests: number,
  mostRequestedSkills: Array<Skill>
}
