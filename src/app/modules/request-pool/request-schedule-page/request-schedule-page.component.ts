import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-request-schedule-page',
  templateUrl: './request-schedule-page.component.html',
  styleUrls: ['./request-schedule-page.component.scss'],
})
export class RequestSchedulePageComponent implements OnInit {
  @Input() request: any;
  @Input() pageWidth: string;
  @Input() showAddFileButton = true;
  @Input() showLogSessionButton = true;
  @Input() showConfirmSessionButton = true;
  sessions: any[];
  currentUser: any;
  showLogSessionModal: boolean;
  showConfirmSessionModal: boolean;
  modalSession: any;
  rerender: boolean;

  constructor(
    private userService: UserService,
    private requestService: RequestService,
    private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.getSessions(this.request.id);
  }

  /**
   *  Opens modal for user to log a session.
   *
   *  @param {object} session - object containing session that will be opened in the modal.
   *
   *  @return {void}
   */
  openSessionModal(session) {
    this.modalSession = session;
    this.showLogSessionModal = true;
  }

  /**
   *  Closes the modal for log session.
   *
   *  @return {void}
   */
  closeSessionModal() {
    this.showLogSessionModal = false;
  }

  /**
   * Opens the confirm session modal
   *
   * @param {Object} session - session to be confirmed
   *
   * @return {void}
  */
  openConfirmSessionModal(session) {
    this.modalSession = session;
    this.showConfirmSessionModal = true;
  }

  /**
   * Closes the confirm session modal
   *
   * @return {void}
  */
  closeConfirmSessionModal() {
    this.showConfirmSessionModal = false;
  }

  /**
   *  Updates the session that was just logged in the array of sessions.
   *  This will prevent the user from logging the session again.
   *
   *  @param {object} event - event object containing the logged session.
   *
   *  @return {void}
   */
  updateSession(event) {
    const loggedSessionPosition = this.sessions.indexOf(event);
    if ((this.currentUser.id === this.request.mentor.id) && event['approved']) {
      event['mentor_logged'] = true;
    }
    if ((this.currentUser.id === this.request.mentee.id) && event['approved']) {
      event['mentee_logged'] = true;
    }
    if ((event['mentee_logged'] || event['mentor_logged']) && !event['approved']) {
      event['mentee_logged'] = null;
      event['mentor_logged'] = null;
    }
    this.sessions.splice(loggedSessionPosition, 1, event);
    this.rerender = true;
    this.changeDetector.detectChanges();
    this.rerender = false;
  }

  /**
   * Deletes file from session
   *
   * @param {Object} session - ID of the session to delete file from
   * @param {Object} event - event containing the ID of file to be deleted
   *
   * @return {void}
   */
  deleteFile(event, session) {
    const sessionLocation = this.sessions.indexOf(session);
    const fileLocation = this.sessions[sessionLocation].files.indexOf(event);
    this.sessions[sessionLocation].files.splice(fileLocation, 1);
  }

  /**
   * Gets all sessions based on the provided request ID.
   *
   * @return {void}
   */
  getSessions(requestId) {
    this.requestService.getRequestSessions(requestId)
      .toPromise()
      .then((sessions) => {
        this.sessions = sessions;
        this.pageWidth = this.calculatePageWidth();
      });
  }

  /**
   * Calculates the page width based on the number of request sessions.
   *
   * @return {string} the page width in pixel
   */
  calculatePageWidth() {
    return (this.sessions.length * 373).toString().concat('px');
  }
}
