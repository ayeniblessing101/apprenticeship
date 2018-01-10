import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pending-requests-table',
  templateUrl: './pending-requests-table.component.html',
  styleUrls: ['./pending-requests-table.component.scss'],
})
export class PendingRequestsTableComponent implements OnInit {

  @Input() requests;
  @Input() title: string;
  @Output() reload: EventEmitter<boolean> = new EventEmitter();
  @Output() request = new EventEmitter<number>();
  openModal: boolean;
  pendingRequest: any[];

  constructor() { }

  ngOnInit() {
  }

  /**
   * Open pending modal to display single request info and emit request to pending
   * modal such that it can be deleted from pending pool
   *
   * @param {Object} request - single request object
   */
  openPendingModal(request) {
    this.pendingRequest = request;
    this.openModal = true;
    this.request.emit(request);
  }

  /**
   * Closes pending modal
   */
  closePendingModal() {
    this.openModal = false;
  }
}
