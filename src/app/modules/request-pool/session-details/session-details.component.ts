import {
  Component, OnInit, Input, Output, EventEmitter,
} from '@angular/core';
import * as moment from 'moment';
import { UserService } from '../../../services/user.service';
import { FileService } from '../../../services/files.service';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.scss'],
})
export class SessionDetailsComponent implements OnInit {
  @Output() openLogSessionModal = new EventEmitter<string>();
  @Output() removeDeletedFile = new EventEmitter<any>();
  @Input() showAddFileButton;
  @Input() showLogSessionButton;
  @Input() showConfirmSessionButton;
  @Input() session: any;
  @Input() request: any;
  isMentor: boolean;
  isMentee: boolean;
  sessionIsDisabled: boolean;
  sessionIsEnabled: boolean;
  sessionNeedsConfirmation: boolean;

  constructor(
    private userService: UserService,
    private fileService: FileService) { }

  ngOnInit() {
    const userId = this.userService.getCurrentUser().id;
    this.isMentor = (userId === this.request.mentor_id);
    this.isMentee = (userId === this.request.mentee_id);
    this.sessionIsDisabled = this.checkCurrentUserLoggedSession() ||
      this.checkSessionIsUpcoming();
    this.sessionIsEnabled = this.checkSessionIsNotLogged() &&
      !this.checkSessionIsUpcoming();
    this.sessionNeedsConfirmation = this.checkCurrentUserNeedsConfirmSession();
  }

  /**
   * Formats session date.
   *
   * @param {string} sessionDate - the session date to format
   *
   * @return {string}
   */
  formatSessionDate(sessionDate) {
    const date = moment(sessionDate);
    const today = moment();
    if (date.isSame(today, 'day')) {
      return 'Today';
    }
    return date.format('MMM DD');
  }

  /**
   * Emits event that opens a log session modal.
   *
   * @return {void}
   */
  openSessionModal() {
    this.openLogSessionModal.emit();
  }

  /**
   * Checks if a session has not been logged. If true, This makes the session active
   * for the user to log
   *
   * @return {boolean}
   */
  checkSessionIsNotLogged() {
    return !this.session.mentor_logged && !this.session.mentee_logged
  }

  /**
   * Checks if the current user has logged the session. If true, this makes the session inactive
   * for the user to log.
   *
   * @return {boolean}
   */
  checkCurrentUserLoggedSession() {
    return this.session.status === 'upcoming' ||
      (this.session.mentor_logged && this.isMentor) ||
      (this.session.mentee_logged && this.isMentee);
  }

  /**
   * Checks if the current user is required to confirm a session.
   *
   * @return {boolean}
   */
  checkCurrentUserNeedsConfirmSession() {
    return (this.session.mentor_logged && !this.session.mentee_logged && this.isMentee) ||
      (this.session.mentee_logged && !this.session.mentor_logged && this.isMentor);
  }

  /**
   * Checks if session is upcoming.
   *
   * @return {boolean}
   */
  checkSessionIsUpcoming() {
    return this.session.status === 'upcoming';
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
        downloadLink.href = response.url;
        downloadLink.click();
      });
  }

  /**
   * Deletes file and triggers event that removes the file from the session
   *
   * @param {Object} session - ID of the session to delete file from
   * @param {Object} file - ID of file to be deleted
   *
   * @return {void}
   */
  deleteFile(file, session) {
    this.fileService.deleteSessionFile(session.id, file.id)
      .toPromise()
      .then((response) => {
        this.removeDeletedFile.emit(file);
      });
  }
}
