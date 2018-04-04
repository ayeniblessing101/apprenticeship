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
  rating: number;
  currentUserIsInterested: boolean;
  currentUserIsRequestOwner: boolean;
  currentUser: any;
  requestedBy: string;
  requestTypes = RequestTypes;

  constructor(private userService: UserService,
              private alertService: AlertService,
              private notificationService: NotificationService,
              private requestService: RequestService) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();

    this.currentUserIsRequestOwner =
      (this.selectedRequest.created_by === this.currentUser.id);

    this.currentUserIsInterested = (this.selectedRequest.interested &&
      this.selectedRequest.interested.includes(this.currentUser.id));

    this.rating = this.selectedRequest.rating ? this.selectedRequest.rating : 0;

    this.requestedBy = this.selectedRequest.request_type_id === this.requestTypes.MENTEE_REQUEST
      ? this.selectedRequest.mentee.fullname : this.selectedRequest.mentor.fullname;
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
   * Listens to a click event outside the request
   * modal. If a user clicks outside the modal, the
   * modal is closed.
   *
   * @return {void}
   */
  @HostListener('click')
  onClick() {
    if (!this.requestModal.nativeElement.contains(event.target)) {
      this.closeRequestModal();
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
    return this.notificationService.sendMessage([this.selectedRequest.created_by], {
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
      ${this.selectedRequest.request_type_id === this.requestTypes.MENTEE_REQUEST
        ? 'mentor' : 'mentee' } about your interest in this mentorship request.
      You will be notified when your interest is approved.
      `);
      })
      .catch(() => {
        this.alertService.showMessage(`An error occured when trying to notify mentee`);
      });
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
}
