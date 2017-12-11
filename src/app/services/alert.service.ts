import { Injectable } from '@angular/core';
import { ConfirmationAlertConfiguration } from '../interfaces/confirmation-alert-configuration.interface';
import { AlertComponent } from 'app/modules/shared/alert/alert.component';


@Injectable()
export class AlertService {
  alertInstanceId: string;
  private alert;

  /**
   * Register an alert
   *
   * @param {AlertComponent} newAlert
   *
   */
  registerAlert(newAlert: AlertComponent): void {
    this.alert = newAlert;
  }

  /**
   * Confirms an action being either by executing the action
   * or popping up a modal that allows a user to decide to
   * either abort or execute an action
   *
   * @param {string} message message to display in the alert
   * @param {object} injectedComponent any Angular component instance
   * @param {object} alertConfig Optional parameter for configuring the alert.
   *
   * @returns {void}
   */
  confirm(
    message: string,
    injectedComponent: object,
    alertConfig?: ConfirmationAlertConfiguration) {
    this.alert.confirmAction(message, injectedComponent, alertConfig);
  }

  /**
   * Opens a message alert
   *
   * @param {string} message message to display in the alert
   *
   * @returns {void}
   */
  showMessage(message: string, afterClose?: Function): void {
    this.alert.showMessage(message, afterClose);
  }
}
