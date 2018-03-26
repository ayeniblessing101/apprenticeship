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
  @Output() openLogSessionModal = new EventEmitter<number>();
  @Output() openConfirmSessionModal = new EventEmitter<string>();
  @Output() removeDeletedFile = new EventEmitter<any>();
  @Input() showAddFileButton;
  @Input() showLogSessionButton;
  @Input() showConfirmSessionButton;
  @Input() session: any;
  @Input() request: any;
  sessions: any[];
  isMentor: boolean;
  isMentee: boolean;
  sessionIsDisabled: boolean;
  sessionIsEnabled: boolean;
  sessionNeedsConfirmation: boolean;
  sessionId: number;
  openFileModal: boolean;
  sessionDate: object;

  constructor(
    private userService: UserService,
    private fileService: FileService) { }

  ngOnInit() {
    const userId = this.userService.getCurrentUser().id;
    this.isMentor = (userId === this.request.mentor.id);
    this.isMentee = (userId === this.request.mentee.id);
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
    this.openLogSessionModal.emit(this.sessionId);
  }

  /**
   * Emits event that opens the log session modal
   *
   * @returns {void}
  */
  openConfirmSession() {
    this.openConfirmSessionModal.emit();
  }

  /**
   * Checks if a session has not been logged. If true, This makes the session active
   * for the user to log
   *
   * @return {boolean}
   */
  checkSessionIsNotLogged() {
    return !this.session.mentor_logged && !this.session.mentee_logged;
  }

  /**
   * Checks if the current user has logged the session. If true, this makes the session inactive
   * for the user to log.
   *
   * @return {boolean}
   */
  checkCurrentUserLoggedSession() {
    return (this.session.mentor_logged && this.isMentor) ||
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

  /** Opens the add file modal.
   * @param session
   *
   * @return {void}
   */
  openAddFileModal(session) {
    this.session = session;
    this.sessionDate = session.date;
    this.sessionId = session.id;
    this.openFileModal = true;
  }

  /**
   * It sets the session id and
   * pushes the added file to the specific session files array.
   * @param event
   *
   * @return {void}
   */
  updateSession(event) {
    this.session.id =  event.session_id;
    this.session.files.push(event.file);
  }

  /**
   * closes the add file modal
   *
   * @return {void}
   */
  closeAddFileModal() {
    this.openFileModal = false;
  }
}
