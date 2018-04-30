import { Component, OnInit } from '@angular/core';
import { ToastService } from 'app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  type: string;
  message: string;
  showMessage: boolean;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.registerToast(this);
  }

  /**
   * Shows a message toast
   *
   * @param {string} message toast message
   * @param {string} type toast type
   *
   * @return {void}
   */
  displayMessage(message: string, type = 'info') {
    this.showMessage = true;
    this.type = type;
    this.message = message;
  }

  /**
   * Changes showMessage to false and closes the toast
   *
   * @return {void}
   */
  closeMessage() {
    this.showMessage = false;
  }
}
