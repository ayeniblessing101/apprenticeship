import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { RequestService } from '../../../services/request.service';
import { NotificationService } from 'app/services/notifications.service';
import { environment } from '../../../../environments/environment';
import { NotificationTypes } from 'app/enums/notification-types.enum';
import { RequestTypes } from '../../../enums/request-types.enum';

@Component({
  selector: 'app-cancel-request-modal',
  templateUrl: './cancel-request-modal.component.html',
  styleUrls: ['./cancel-request-modal.component.scss'],
})
export class CancelRequestModalComponent implements OnInit {
  @Input() request;
  @Output() closeCancelRequestModal = new EventEmitter<string>();
  message: string;
  currentUserId: string;
  requestId: number;
  requestTypes = RequestTypes;
  cancellationReason = `--Select Reason--`;
  showDropdown = false;
  cancelRequestReason = [
    `Externally matched`,
    `Too long to match`,
  ];

  constructor(
    private requestService: RequestService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.message = `Are you sure you want to cancel your
     "${this.request.title}" request? This can't be undone.`;
    this.requestId = this.request.id;
  }

  /**
   * Cancel Mentorship request
   *
   * @return {void}
   */
  cancelRequest() {
    const reasonIsSet = this.checkIfCancellationReasonIsSet();
    if (reasonIsSet) {
      const reason = { reason: this.cancellationReason };
      this.requestService.cancelRequest(this.requestId, reason)
        .toPromise()
        .then((reponse) => {
          this.closeCancelRequestModal.emit('parentModel');
          this.requestService.updatePendingPoolRequests();
        });
      this.sendCancelRequestNotification();
    }
  }

  /**
   * Check whether a user selected a reason when cancelling a request
   *
   * @return {boolean}
   */
  checkIfCancellationReasonIsSet() {
    if (this.cancelRequestReason.includes(this.cancellationReason)) {
      return true;
    }

    if (!this.cancelRequestReason.includes(this.cancellationReason)) {
      this.cancellationReason = `Please select a reason before cancelling the request`;
      return false;
    }

  }

  /**
   * Set Cancellation Reason
   *
   * @param {string} cancellationReason - Reason selected by the user
   *
   * @return {void}
   */
  setCancellationReason(cancellationReason) {
    this.cancellationReason = cancellationReason;
  }

  /**
   * Close cancel request modal
   *
   * @return {void}
   */
  closeModal() {
    this.closeCancelRequestModal.emit('cancelRequestModal');
  }

  /**
   * Send cancelled request notification to mentor/mentee
   *
   * @param {any} id - The id of the user to be notified
   * @param {any} type - The type of notification
   * @param {any} message - The message body
   *
   * @returns {void}
   */
  sendCancelRequestNotification() {
    const id = this.request.interested;
    const requestType = (this.request.request_type_id = 1) ? 'mentor' : 'mentee';
    const type = (this.request.request_type_id = 1) ?
    NotificationTypes.MENTEE_WITHDRAWS_REQUEST : NotificationTypes.MENTOR_WITHDRAWS_REQUEST;
    const message = {
      title: '',
      content:
      `${this.request.created_by.fullname} has withdrawn their request for ${this.request.title} ${requestType}.`,
    }
    const payload = {
      id,
      type,
      message,
      sender: this.request.created_by.fullname,
      timestamp: Date.now(),
    }
    return this.notificationService.sendMessage([payload.id], payload);
  }
}
