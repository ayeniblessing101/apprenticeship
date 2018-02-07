import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import * as moment from 'moment'
import { FileService } from 'app/services/files.service';

@Component({
  selector: 'app-request-schedule-page',
  templateUrl: './request-schedule-page.component.html',
  styleUrls: ['./request-schedule-page.component.scss'],
})

export class RequestSchedulePageComponent implements OnInit {
  @Input() request;
  @Input() showAddFileButton = true;
  @Input() showLogSessionButton = true;
  nextSessionDate: any;
  sessions: any;
  pageWidth: string;

  constructor (
    private requestService: RequestService,
    private fileService: FileService,
  ) {}

  ngOnInit() {
    this.assignSessions();
    this.assignNextSessionDate();
  }
  /**
   * Format session date.
   *
   * @param {moment.Moment} date
   *
   * @return {string}
   */
  formatSessionDate(date: string) {
    const sessionDate = moment(date);
    const today = moment();
    if (sessionDate.diff(today, 'days') === 0) {
      return 'Today';
    }
    return sessionDate.format('MMM DD');
  }

  /**
   * Assign next session date.
   *
   * @return {void}
   */
  assignNextSessionDate() {
    const startDateClone = moment(this.request.match_date).clone();
    const mentorshipEndDate = startDateClone.add(this.request.duration, 'months');
    for (const day of this.request.pairing.days) {
      if (moment().day(day).day() > moment().day() && moment().isBefore(mentorshipEndDate)) {
        this.nextSessionDate = this.formatSessionDate(moment().day(day).format('YYY MM DD'));
        break;
      }
    }
    if (this.nextSessionDate === undefined) {
      const firstDay = moment().day(this.request.pairing.days[0]).day();
      const nextDay = moment().day(firstDay).add(1, 'weeks');
      if (nextDay.day() < mentorshipEndDate.day()) {
        this.nextSessionDate = this.formatSessionDate(nextDay.format('YYY MM DD'));
      }
    }
  }

  /**
   * Assign sessions from request service.
   *
   *@return {void}
   */
  assignSessions() {
    this.requestService.getRequestSessions(this.request.id)
      .toPromise()
      .then((response) => {
        this.sessions = response;
        let sessionsCount = this.sessions.length;
        if (this.nextSessionDate) {
          sessionsCount += 1;
        }

        this.pageWidth = (sessionsCount * 450).toString().concat('px');
      })
  }

  /**
   * Downloads file by generating the url on demand and downloading the file
   *
   * @param {Number} fileId - ID of file to be downloaded
   *
   * @return {void}
   */
  downloadFile(fileId) {
    this.fileService.getFileDownloadUrl(fileId)
      .toPromise()
      .then((response) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = response.url
        downloadLink.click();
      });
  }

  /**
   * Deletes file from session
   *
   * @param {Object} session - ID of the session to delete file from
   * @param {Object} file - ID of file to be deleted
   *
   * @return {void}
   */
  deleteFile(session, file) {
    this.fileService.deleteSessionFile(session.id, file.id)
      .toPromise()
      .then((response) => {
        const sessionLocation = this.sessions.indexOf(session);
        const fileLocation = this.sessions[sessionLocation].files.indexOf(file);
        this.sessions[sessionLocation].files.splice(fileLocation, 1);
      });
  }
}
