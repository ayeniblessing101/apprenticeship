import { MentorRating } from './mentor-rating.interface';
import { MenteeRating } from './mentee-rating.interface';

/**
 * @interface Session
 * Blueprint for the session object
 */
export interface Session {
  session_id?: number,
  date?: number,
  start_time?: string,
  end_time?: string,
  comment?: string,
  rating_scale?: number,
  rating_values?: MenteeRating | MentorRating
}

/**
 * @interface SessionDetails
 * Blueprint for the sessiondetails object
 */
export interface SessionDetails {
  totalSessions?: number,
  totalSessionsLogged?: number,
  totalSessionsPending?: number,
  totalSessionsUnlogged?: number
}
