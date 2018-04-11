import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { RequestService } from '../../../services/request.service';

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
  cancellationReason = `--Select Reason--`;
  showDropdown = false;
  cancelRequestReason = [
    `Externally matched`,
    `Too long to match`,
  ];

  constructor(
    private requestService: RequestService,
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
          this.closeCancelRequestModal.emit('pendingRequestModal');
          this.requestService.updatePendingPoolRequests();
        });
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
}
