import { Injectable } from '@angular/core';
import { AlertComponent } from '../modules/shared/alert/alert.component';

@Injectable()
export class AlertService {
  private alert;

  constructor() {}

  /**
   * Register an alert
   *
   * @param {AlertComponent} newAlert
   * @memberof AlertService
   */
  registerAlert(newAlert: AlertComponent): void {
    this.alert = newAlert;
  }

  /**
   * Open an alert
   *
   * @param {string} message message to display in the alert
   * @memberof AlertService
   */
  open(message: string): void {
    if (this.alert) {
      this.alert.message = message;
      this.alert.isOpen = true;
    }
  }

  /**
   * Close an alert
   *
   * @returns {void}
   */
  close(): void {
    if (this.alert) {
      this.alert.isOpen = false;
    }
  }
}
