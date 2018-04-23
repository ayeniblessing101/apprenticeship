import { Injectable } from '@angular/core';
import { ToastComponent } from '../modules/shared/toast/toast.component';

@Injectable()
export class ToastService {
  private toast: ToastComponent;

  /**
   * Register a toast
   *
   * @param {ToastComponent} newToast
   *
   */
  registerToast(newToast: ToastComponent) {
    this.toast = newToast;
  }

  /**
   * Displays a message toast
   *
   * @param {string} message toast message
   * @param {string} type toast type
   * @param {number} duration toast duration
   *
   * @returns {void}
   */
  displayMessage(message: string, type = 'info',  duration = 4000) {
    this.toast.displayMessage(message, type, duration);
  }
}
