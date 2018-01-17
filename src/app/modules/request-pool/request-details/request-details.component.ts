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


@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
})
export class RequestDetailsComponent implements OnInit {
  @Input() selectedRequest;
  @Output() close = new EventEmitter();
  @ViewChild('requestModal') requestModal: ElementRef;
  userInfo: object;
  rating: number;
  constructor(private userService: UserService,
              private alertService: AlertService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.userService.getUserInfo(this.selectedRequest.mentee_id)
      .toPromise().then((user) => {
        this.userInfo = user;
        this.rating = user.rating;
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
   * Called when "I'm interested button" of a request is clicked
   * It sends notification to the requester when a user indicates
   * interest in a request.
   *
   * @todo implement the I'm interested functionality
   *
   * @returns {void}
   */
  indicateInterest() {
    this.notifyMentee();
  }

  /**
   * Sends notification to mentee when a user offers to mentor
   *
   * @returns {Promise} Promise from notification service
   */
  notifyMentee() {
    const currentUser = this.userService.getCurrentUser();

    return this.notificationService.sendMessage([this.selectedRequest.mentee_id], {
      type: NotificationTypes.MENTOR_REQUEST,
      message: {
        title: 'New Mentor Request',
        content: `Somone has offered to mentor you on "${this
          .selectedRequest.primarySkills}."`,
      },
      sender: currentUser.name,
      timestamp: Date.now(),
      messageUrl: `${environment.lenkenBaseUrl}/requests/pending`,
    })
      .then(() => {
        this.alertService.showMessage(`
      Clicked the I'm interested button.  This functionality is still in
      progress. Nevertheless, a notification would be sent to the requester.
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
}
