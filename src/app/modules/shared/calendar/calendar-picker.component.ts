import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { CalendarDate } from '../../../interfaces/calendar-date.interface';

@Component({
  selector: 'app-calendar-picker',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.scss'],
})
export class CalendarPickerComponent implements OnInit, OnChanges {
  @Output() onDateSelected = new EventEmitter();
  @Input() borderSelector = '0px';
  @Input() label: string;
  today = Date();
  currentDate = moment();
  dayNames = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  weeks: CalendarDate[][] = [];
  showDropDownContent = false;
  selectedDate: string;

  ngOnInit(): void {
    this.generateCalendar();
    this.selectedDate = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.generateCalendar();
  }

  /**
   * Check whether the date is today.
   *
   * @param {moment.Moment} date - date to check.
   *
   * @return {boolean}
   */
  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  /**
   * Check whether the month is selected.
   *
   * @param {moment.Moment} date - date to check.
   *
   * @return {boolean}
   */
  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

  /**
   * Get date from previous month
   */
  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }

  /**
   * Get date for a month from now.
   *
   * @return {void}
   */
  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }

  /**
   * Generate calendar.
   *
   * @return {void}
   */
  generateCalendar(): void {
    const dates = this.fillCalendarDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  /**
   * Fill calendar with dates.
   *
   * @param {moment.Moment} currentMoment - current chosen date.
   *
   * @return {CalendarDate[]}
   */
  fillCalendarDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    let start = firstDayOfGrid.date();
    const gridEnd = start + 42;
    const dates = [];
    while (start < gridEnd) {
      dates.push(start);
      start += 1;
    }
    return dates
      .map((date): CalendarDate => {
        const selectedDay = moment(firstDayOfGrid).date(date);
        return {
          today: this.isToday(selectedDay),
          status: '',
          date: selectedDay,
        };
      });
  }

  /**
   * Set the date from the calendar
   * Emit the date event.
   * @param {moment.Moment} date - The chosen date.
   *
   * @return {void}
   */
  setDate(date: moment.Moment) {
    this.selectedDate = date.format('DD-MM-YYYY');
    this.onDateSelected.emit(this.selectedDate);
  }
}
