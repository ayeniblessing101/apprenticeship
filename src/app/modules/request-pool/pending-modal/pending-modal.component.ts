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

import { User } from './../../../interfaces/user.interface';

@Component({
  selector: 'app-pending-modal',
  templateUrl: './pending-modal.component.html',
  styleUrls: ['./pending-modal.component.scss'],
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
  rating: number;

  alertServiceConfig = {
    abortActionText: 'BACK',
    confirmActionText: 'PROCEED',
    confirmAction: null,
    canDisable: true,
  }

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private requestService: RequestService,
  ) {
    this.acceptInterestedUser = this.acceptInterestedUser.bind(this);
    this.rejectInterestedUser = this.rejectInterestedUser.bind(this);
    this.withdrawInterest = this.withdrawInterest.bind(this);
  }

  ngOnInit() {
    this.userIds = [this.request.created_by];
    this.currentUserId = this.userService.getCurrentUser().id;

    if (this.request.created_by === this.currentUserId) {
      if (this.request.interested) {
        this.userIds = this.request.interested.concat([this.request.created_by]);
      }
    }
    this.requestedBy = this.request.request_type_id === 2 ? this.request.mentee.fullname :
      this.request.mentor.fullname;

    this.rating = this.request.rating ? this.request.rating : 0;

    this.getUsersByIds(this.userIds);
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
   * Separate user from interested users in the users array
   *
   * @param {Array} users - array of all users, user who made the request
   * and interested users
   */
  separateUserWhoMadeTheRequestFromInterestedUsers(users: User[]) {
    users.forEach((user) => {
      if (user.id === this.request.created_by) {
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

    const confirmationMessage = `Accepting this mentor means he/she will mentor you on this
      particular request and others will not be able to mentor you`;

    this.alertService.confirm(confirmationMessage, this, this.alertServiceConfig);
  }

  /**
   * Pop up confirmation modal to reject an interested user
   *
   * @param {User} interestedUser - the user to be rejected
   */
  confirmRejectInterestedUser(interestedUser) {
    this.interestedUser = interestedUser;

    this.alertServiceConfig.confirmAction = this.rejectInterestedUser;

    const confirmationMessage = `Rejecting this mentor means he/she will not mentor you on this
      particular request`;

    this.alertService.confirm(confirmationMessage, this, this.alertServiceConfig);
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
    const confirmationMessage = `Are you sure you want to withdraw interest in
     "${this.request.title}" request? This can't be undone.`;

    this.alertServiceConfig.confirmAction = this.withdrawInterest;
    this.alertServiceConfig.confirmActionText = `WITHDRAW INTEREST`;
    this.alertServiceConfig.abortActionText = `GO BACK`;
    this.alertServiceConfig.canDisable = false;

    this.alertService.confirm(confirmationMessage, this, this.alertServiceConfig);
  }

  /**
   * Withdraw interest in Mentorship Request
   *
   * @return void
   */
  withdrawInterest() {
    this.requestService.withdrawInterest(this.request.id)
      .toPromise()
      .then((reponse) => {
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

   /** Close modal
   *
   * @param {event} modal - Modal to be closed
   *
   * @returns {void}
   */
  closeModal(modal) {
    if (modal === 'cancelRequestModal') {
      this.showCancelRequestModal = false;
    }

    if (modal === 'pendingRequestModal') {
      this.closePendingModal.emit();
    }
  }
}
