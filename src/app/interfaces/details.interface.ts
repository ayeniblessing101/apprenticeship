import { Skill } from './skill.interface';

/**
 * @interface Message
 * Blueprint for the notification object
 */
export interface Details {
  title: string;
  description: string;
  request_skills: Array<Skill>;
  duration: number;
}
