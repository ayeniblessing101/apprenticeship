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
  openModal: boolean;
  modalRequest: any[];
  modalType: string;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Open pending modal to display single request info
   *
   * @param {Object} request - single request object
   */
  openPendingModal(request) {
    this.modalRequest = request;
    this.openModal = true;
    this.modalType = this.title === 'AWAITING YOU' ? 'myRequests' : 'myInterests';
  }

  /**
   * Closes pending modal
   */
  closePendingModal() {
    this.openModal = false;
  }

  /**
   * Reloads pending pool
   */
  reloadPendingPool() {
    this.reload.emit();
  }
}
