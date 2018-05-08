import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  HostListener,
  ElementRef,
} from '@angular/core';
import { CancelRequestModalComponent } from '../cancel-request-modal/cancel-request-modal.component';
import { UserService } from '../../../services/user.service';
import { AlertService } from 'app/services/alert.service';
import { NotificationService } from 'app/services/notifications.service';
import { environment } from '../../../../environments/environment';
import { NotificationTypes } from 'app/enums/notification-types.enum';
import { RequestService } from '../../../services/request.service';
import { RequestTypes } from '../../../enums/request-types.enum';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details-modal.component.html',
  styleUrls: ['./request-details-modal.component.scss'],
})
export class RequestDetailsModalComponent implements OnInit {
  @Input() selectedRequest;
  @Output() close = new EventEmitter();
  @Output() filterRequestsPool = new EventEmitter();
  @ViewChild('requestModal') requestModal: ElementRef;
  currentUserIsInterested: boolean;
  currentUserIsRequestOwner: boolean;
  showCancelRequestModal: boolean;
  requestToCancel: any;
  currentUser: any;
  requestTypes = RequestTypes;
  userRole: string;
  rating: any;

  constructor(private userService: UserService,
              private alertService: AlertService,
              private notificationService: NotificationService,
              private requestService: RequestService) { }

  ngOnInit() {
    this.getUserRating();
    this.currentUser = this.userService.getCurrentUser();
    this.currentUserIsRequestOwner =
      (this.selectedRequest.created_by.id === this.currentUser.id);
    this.currentUserIsInterested = (this.selectedRequest.interested &&
      this.selectedRequest.interested.includes(this.currentUser.id));
    this.userRole = (this.selectedRequest.request_type_id === this.requestTypes.MENTEE_REQUEST)
        ? 'mentor' : 'mentee';
  }

  /**
   * Gets user rating details
   *
   * @return {void}
   */
  getUserRating() {
    this.userService.getRating(this.selectedRequest.created_by.id)
      .toPromise()
      .then((response) => {
        this.rating = (this.selectedRequest.request_type_id === this.requestTypes.MENTEE_REQUEST)
        ? response.mentee_average : response.mentor_average;
      });
  }

  /**
   * Updates request interested field when user indicates interest
   * in a mentorship request.
   *
   * @return {void}
   */
  indicateInterest() {
    this.requestService.indicateInterest(this.selectedRequest.id)
      .toPromise()
      .then(() => {
        this.currentUserIsInterested = true;
        this.initiateRequestsPoolFilter();
        this.notifyMentee();
      });
  }

  /**
   * Listens to a click event outside the either the request
   * details modal or the cancel request. If a user clicks
   * outside the either of the modals, the modal is closed.
   *
   * @param {event} - DOM event
   *
   * @return {void}
   */
  @HostListener('click', ['$event'])
  onClick(event) {
    if (event.path[1].localName === 'app-cancel-request-modal') {
      this.closeCancelRequestModal('cancelRequestModal')
    } else if (event.path[1].localName === 'app-request-details') {
      this.closeRequestModal()
    }
  }

  /**
   * Sends notification to mentee when a user offers to mentor
   *
   * @returns {Promise} Promise from notification service
   */
  notifyMentee() {
    const requestSkills = this.selectedRequest.request_skills
      .filter(skill => skill.type === 'primary');
    const primarySkills = (requestSkills.map(primarySkill => primarySkill.name));
    primarySkills.splice(primarySkills.length - 1, 0, 'and');
    const selectedSkills = primarySkills.join(', ');
    return this.notificationService.sendMessage([this.selectedRequest.created_by.id], {
      type: NotificationTypes.MENTOR_REQUEST,
      message: {
        title: 'New Mentor Request',
        content: `Someone has offered to mentor you on "${selectedSkills}."`,
      },
      sender: this.currentUser.name,
      timestamp: Date.now(),
      messageUrl: `${environment.lenkenBaseUrl}/requests/pending`,
    })
      .then(() => {
        this.alertService.showMessage(`
      We have sent a notification to the
      ${this.userRole} about your interest.
      You will be notified when your interest is approved.
      `);
      })
      .catch(() => {
        this.alertService.showMessage(`An error occured when trying to notify the
        ${this.userRole}.`);
      });
  }

  /**
   * Open the cancel request modal with the title of the request
   * to be cancelled
   *
   * @param request - request to be cancelled
   *
   * @returns {void}
   */
  openCancelRequestModal(request) {
    this.showCancelRequestModal = true;
    this.requestToCancel = request;
  }

  /**
   * Triggers the emitter event which
   * closes the modal.
   *
   * @return {void}
   */
  closeRequestModal() {
    this.close.emit();
  }

  /**
   * Triggers the emitter event used by the
   * pool records component to make the requests pool
   * component update its requests pool
   *
   * @return {void}
   */
  initiateRequestsPoolFilter() {
    this.filterRequestsPool.emit();
  }

  /** Close either the cancel request modal or the request
   * details modal
  *
  * @param {event} modal - Modal to be closed
  *
  * @returns {void}
  */
  closeCancelRequestModal(modal) {
    if (modal === 'cancelRequestModal') {
      this.showCancelRequestModal = false;
    } else if (modal === 'parentModel') {
      this.initiateRequestsPoolFilter();
      this.closeRequestModal();
    }
  }
}
