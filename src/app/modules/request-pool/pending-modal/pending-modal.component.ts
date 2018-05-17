import {
  Component,
  OnInit,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  ViewChild,
  HostListener,
} from '@angular/core';
import { CancelRequestModalComponent } from '../cancel-request-modal/cancel-request-modal.component';

import { UserService } from './../../../services/user.service';
import { AlertService } from './../../../services/alert.service';
import { RequestService } from './../../../services/request.service';
import { NotificationService } from './../../../services/notifications.service';
import { User } from './../../../interfaces/user.interface';
import { RequestTypes } from '../../../enums/request-types.enum';
import { NotificationTypes } from '../../../enums/notification-types.enum';
import { RequestSkillPipe } from '../../../pipes/request-skills-pipe';

@Component({
  selector: 'app-pending-modal',
  templateUrl: './pending-modal.component.html',
  styleUrls: ['./pending-modal.component.scss'],
  providers: [RequestSkillPipe],
})
export class PendingModalComponent implements OnInit {
  @Input() request;
  @Input() userId;
  @Input() type;
  @Output() closePendingModal = new EventEmitter();
  @ViewChild('pendingModal') pendingModal: ElementRef;

  userWhoMadeTheRequest: User;
  interestedUsers: User[] = [];
  userIds: string[] = [];
  interestedUser: User;
  showCancelRequestModal = false;
  requestToCancel: any;
  currentUserId: string;
  requestedBy: string;
  rating: any;
  requestTypes = RequestTypes;
  currentUser: any;

  alertServiceConfig = {
    abortActionText: 'BACK',
    confirmActionText: 'PROCEED',
    confirmAction: null,
    canDisable: true,
  };

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private requestService: RequestService,
    private notificationService: NotificationService,
    private requestSkillPipe: RequestSkillPipe,
  ) {
    this.acceptInterestedUser = this.acceptInterestedUser.bind(this);
    this.rejectInterestedUser = this.rejectInterestedUser.bind(this);
    this.withdrawInterest = this.withdrawInterest.bind(this);
  }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.userIds = [this.request.created_by.id];
    this.currentUserId = this.userService.getCurrentUser().id;
    this.getUserRating();

    if (this.request.created_by.id === this.currentUserId) {
      if (this.request.interested) {
        this.userIds = this.request.interested.concat([this.request.created_by.id]);
      }
    }
    this.requestedBy = this.request.created_by.fullname;
    this.getUsersByIds(this.userIds);
    this.request.skills = this.requestSkillPipe.transform(this.request.request_skills, 'primary');
  }

  /**
   * Picks up click events from the Host Listener to determine if
   * click was outside modal
   *
   * @param event
   */
  @HostListener('click', ['$event'])
  onClick(event) {
    if (event.path[1].localName === 'app-cancel-request-modal') {
      this.closeModal('cancelRequestModal');
    }

    if (event.path[1].localName === 'app-pending-modal') {
      this.closeModal('pendingRequestModal');
    }
  }

  /**
   * Get user information of mentee and interested mentors by their ids
   *
   * @param {Array} userIds - contains mulitple user ids
   *
   * @return {void}
   */
  getUsersByIds(userIds: string[]) {
    this.userService.getUsersByIds(userIds)
      .toPromise()
      .then((users: User[]) => {
        const formattedUsers = this.formatUserSkills(users);
        this.separateUserWhoMadeTheRequestFromInterestedUsers(formattedUsers);
      });
  }

  /**
   * Gets user's rating
   *
   * @return {void}
   */
  getUserRating() {
    this.userService.getRating(this.request.created_by.id)
      .toPromise()
      .then((response) => {
        this.rating = (this.request.request_type_id === this.requestTypes.MENTEE_REQUEST)
        ? response.mentee_average : response.mentor_average;
      });
  }

  /**
   * Separate user from interested users in the users array
   *
   * @param {Array} users - array of all users, user who made the request
   * and interested users
   */
  separateUserWhoMadeTheRequestFromInterestedUsers(users: User[]) {
    users.forEach((user) => {
      if (user.id === this.request.created_by.id) {
        this.userWhoMadeTheRequest = user;
      } else {
        this.interestedUsers.push(user);
      }
    });
  }

  /**
   * Return structured user information for use within the modal
   *
   * @param {Array} users - users comprising a mentee and interested mentors
   *
   * @return {User[]} user with formatted skills
   */
  formatUserSkills(users): User[] {
    const formattedUsers = [];

    users.forEach((user) => {
      const userSkills = user.skills.map((skill) => {
        return skill.name;
      });
      user.skills = userSkills.join(', ');
      formattedUsers.push(user);
    });

    return formattedUsers;
  }

  /**
   * Pop up confirmation modal for accepting an interested user
   *
   * @param {User} interestedUser - the user to be accepted
   */
  confirmAcceptInterestedUser(interestedUser) {
    this.interestedUser = interestedUser;

    this.alertServiceConfig.confirmAction = this.acceptInterestedUser;

    const menteeMessage = `Accepting this mentor means he/she will mentor you on this
    particular request and others will not be able to mentor you`;
    const mentorMessage = `Accepting this mentee means you will mentor him/her on this
    particular request and you will not be assigned other mentees on this request`;
    const confirmationMessage = this.request.request_type_id === this.requestTypes.MENTEE_REQUEST ? mentorMessage :
      menteeMessage;

    this.alertService.confirm(confirmationMessage, this, this.alertServiceConfig);
    const id = this.interestedUser.id;
    const notificationType = (this.request.request_type_id === this.requestTypes.MENTOR_REQUEST) ?
    NotificationTypes.MENTEE_ACCEPTS_MENTOR : NotificationTypes.MENTOR_ACCEPTS_MENTEE;
    const notificationMessage = {
      title: (this.request.request_type_id === this.requestTypes.MENTOR_REQUEST) ? 'Mentee Accepts' : 'Mentor Accepts',
      content: (this.request.request_type_id === this.requestTypes.MENTOR_REQUEST) ?
        `Congratulations!, ${this.request.created_by_name} has accepted you as their ${this.request.skills} mentor` :
        `Congratulations!, ${this.request.created_by_name} has accepted you as their ${this.request.skills} mentee.`,
    }
    this.sendNotification(id, notificationType, notificationMessage);
  }

  /**
   * Pop up confirmation modal to reject an interested user
   *
   * @param {User} interestedUser - the user to be rejected
   */
  confirmRejectInterestedUser(interestedUser) {
    this.interestedUser = interestedUser;
    this.alertServiceConfig.confirmAction = this.rejectInterestedUser;

    const confirmationMessage = this.request.request_type_id === this.requestTypes.MENTEE_REQUEST ?
      `Rejecting this mentor means he/she will not mentor you on this particular request` :
      `Rejecting this mentee means he/she will not be your mentee on this particular session`;
    this.alertService.confirm(confirmationMessage, this, this.alertServiceConfig);
    const id = this.interestedUser.id;
    const notificationType = (this.request.request_type_id === this.requestTypes.MENTOR_REQUEST) ?
      NotificationTypes.MENTEE_REJECTS_MENTOR : NotificationTypes.MENTOR_REJECTS_MENTEE;
    const notificationMessage = {
      title: (this.request.request_type_id === this.requestTypes.MENTOR_REQUEST) ? 'Mentee Rejects' : 'Mentor Rejects',
      content: (this.request.request_type_id === this.requestTypes.MENTOR_REQUEST) ?
      `${this.request.created_by_name} opted to go with a different ${this.request.skills} mentor` :
      `${this.request.created_by_name} opted to go with a different ${this.request.skills} mentee.`,
    };
    this.sendNotification(id, notificationType, notificationMessage);
  }

  /**
   * Calls service to accept an interested user and close modal
   *
   * @param {Object} mentorData - contains mentor id and name
   *
   * @return {void}
   */
  acceptInterestedUser() {
    const { id: interestedUserId, name: interestedUserName } = this.interestedUser;
    this.requestService.acceptInterestedUser(this.request.id, { interestedUserId, interestedUserName })
      .toPromise().then((response) => {
        this.closePendingModal.emit();
        this.requestService.updatePendingPoolRequests();
      });
  }

  /**
   * Makes service call to reject mentor
   *
   * @return {void}
   */
  rejectInterestedUser() {
    const { id: interestedUserId, name: interestedUserName } = this.interestedUser;
    this.requestService.rejectInterestedUser(this.request.id, { interestedUserId, interestedUserName })
      .toPromise().then((response) => {
        this.request.interested = response.interested;

        if (!(this.request.interested)) {
          this.closePendingModal.emit();
          this.requestService.updatePendingPoolRequests();
          return;
        }
        this.removeRejectedInterestedUser();
      });
  }

  /**
   * Removes rejected mentor from mentors array
   *
   * @return {void}
   */
  removeRejectedInterestedUser() {
    for (const interestedUser of this.interestedUsers) {
      if (this.request.interested.indexOf(interestedUser.id) < 0) {
        const interestedUserIndex = this.interestedUsers.indexOf(interestedUser);
        this.interestedUsers.splice(interestedUserIndex, 1);
        break;
      }
    }
  }

  /**
   * Confirm withdrawing interest in mentorship request
   *
   * @return {void}
   */
  confirmWithdrawInterest() {
    const confirmationMessage = `Are you sure you want to withdraw interest in the
     ${this.request.title} request for ${this.request.request_type_id ===
      this.requestTypes.MENTEE_REQUEST ? 'mentee' : 'mentor'}? This can't be undone.`;

    this.alertServiceConfig.confirmAction = this.withdrawInterest;
    this.alertServiceConfig.confirmActionText = `WITHDRAW INTEREST`;
    this.alertServiceConfig.abortActionText = `GO BACK`;
    this.alertServiceConfig.canDisable = false;

    this.alertService.confirm(confirmationMessage, this, this.alertServiceConfig);
    const id = this.request.created_by.id;
    const notificationType = (this.request.request_type_id === this.requestTypes.MENTOR_REQUEST) ?
    NotificationTypes.MENTEE_WITHDRAWS_INTEREST : NotificationTypes.MENTOR_WITHDRAWS_INTEREST;
    const notificationMessage = {
      title: '',
      content: (this.request.request_type_id === this.requestTypes.MENTOR_REQUEST) ?
      `${this.currentUser.firstName} has withdrawn interest in mentoring you in ${this.request.title}.` :
      `${this.currentUser.firstName} has withdrawn interest in being your ${this.request.title} mentee.`,
    };
    this.sendNotification(id, notificationType, notificationMessage);
  }

  /**
   * Withdraw interest in Mentorship Request
   *
   * @return void
   */
  withdrawInterest() {
    this.requestService.withdrawInterest(this.request.id)
      .toPromise()
      .then((response) => {
        this.requestService.updatePendingPoolRequests();
        this.closeModal('pendingRequestModal');
      });
  }

  /** Open Cancel Request modal
  *
  * @param request
  *
  * @returns {void}
  */
  openCancelRequestModal(request) {
    this.showCancelRequestModal = true;
    this.requestToCancel = request;
  }

  /**
   * Close either the cancel request modal or the pending
   * request modal
  *
  * @param {event} modal - Modal to be closed
  *
  * @returns {void}
  */
  closeModal(modal) {
    if (modal === 'cancelRequestModal') {
      this.showCancelRequestModal = false;
    }

    if (modal === 'parentModel' || modal === 'pendingRequestModal') {
      this.closePendingModal.emit();
    }
  }

  /**
   * Notification payload
   *
   * @param {any} type
   * @param {any} message
   * @returns {void}
   */
  sendNotification(id, type, message) {
    const payload = {
      id,
      type,
      message,
      sender: this.currentUser.name,
      timestamp: Date.now(),
    }
    return this.notificationService.sendMessage([payload.id], payload);
  }
}
