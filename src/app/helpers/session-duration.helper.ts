import * as moment from 'moment';

/**
 * Helper function that calculates session duration
 *
 * @param session - mentorship session
 *
 * @returns {String} - formatted session duration
 */
export function getSessionDuration(session) {
  const startTime = moment(session.start_time, 'HH:mm');
  const endTime = moment(session.end_time, 'HH:mm');
  const sessionLength = moment.duration(moment(endTime).diff(startTime));
  const hours = Math.floor(sessionLength.asHours());
  const minutes = sessionLength.minutes();
  const readableHours = `${hours} ${hours > 1 ? 'hours' : 'hour'}`;
  const readableMinutes = ` ${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`;

  let result = '';
  result +=  hours > 0 ? readableHours : '';
  result += minutes > 0 ? readableMinutes : '';

  return result.trim();
}
