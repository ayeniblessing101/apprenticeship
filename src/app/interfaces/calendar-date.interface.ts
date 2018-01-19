import * as moment from 'moment';

export interface CalendarDate {
  date: moment.Moment;
  status: string;
  today?: boolean;
}
