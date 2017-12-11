import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AlertService } from 'app/services/alert.service';
import { ConfirmationAlertConfiguration } from 'app/interfaces/confirmation-alert-configuration.interface';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {

  alertInstanceId: string;
  message: string;
  confirmationAlertConfig: ConfirmationAlertConfiguration = {
    confirmActionText: 'YES',
    abortActionText: 'CLOSE',
    confirmAction: null,
    canDisable: false,
  };
  afterMessageClose: Function;

  confirmationAlertInvoker: object;
  isMessage = false;
  isConfirmation = false;
  disabledAlertsInstanceIds: string[];
  isConfirmDeactivated: boolean;

  constructor(private alertService: AlertService) {
    this.isConfirmDeactivated = false;
  }

  ngOnInit() {
    this.alertService.registerAlert(this);
  }

  /**
   * Shows a message alert
   *
   * @param {string} message a that will show on the alert
   *
   * @return {void}
   */
  showMessage(message: string, afterClose?: Function) {
    this.isMessage = true;
    this.isConfirmation = false;
    this.message = message;
    this.afterMessageClose = afterClose;
  }

  /**
   * Closes message alert
   *
   * @returns {void}
   */
  closeMessageAlert() {
    this.isMessage = false;
    if (this.afterMessageClose) {
      this.afterMessageClose()
    }
  }

  /**
   * Confirms an action being either by executing the action
   * or popping up a modal that allows a user to decide to
   * either abort or execute an action
   *
   * @param {string} message message to display in the alert
   * @param {object} invokingComponent any Angular component instance
   * @param {object} confirmAlertConfig Optional parameter for configuring the alert.
   *
   * @returns {void}
   */
  confirmAction(message: string,
                invokingComponent: object,
                confirmAlertConfig: ConfirmationAlertConfiguration) {
    this.setConfirmationAlertConfig(confirmAlertConfig);
    this.initializeDeactivatedConfirmationAlerts();
    this.alertInstanceId = this.generateConfirmationAlertId(invokingComponent);
    this.isConfirmDeactivated = this
        .isAlertInstanceDeactivated();

    if (this.isConfirmDeactivated) {
      this.confirmationAlertConfig.confirmAction();
    } else {
      this.showConfirmationAlert(message, invokingComponent);
    }
  }

  private showConfirmationAlert(message: string, invokingComponent: object) {
    this.isMessage = false;
    this.isConfirmation = true;
    this.message = message;
    this.confirmationAlertInvoker = invokingComponent;
  }
  /**
   * Closes confirmation alert
   *
   * @returns {void}
   */
  closeConfirmationAlert() {
    this.isConfirmation = false;
  }

  /**
   * Modifies default alert component with
   *
   * @param configModifications modification to default alert config
   *
   * @returns {void}
   */
  private setConfirmationAlertConfig(configModifications: object): void {
    this.confirmationAlertConfig = {
      ...this.confirmationAlertConfig,
      ...configModifications,
    };
  }

  /**
   * It generates id for a confirmation alert using a combination of the
   * name of the component that is invoking the alert and the configuration
   *
   * @param {object} invokingComponent component trying to invoke confirmation alert
   */
  private generateConfirmationAlertId(invokingComponent: object): string {
    const invokingComponentName = invokingComponent.constructor.name;
    return `${invokingComponentName}::${JSON.stringify(this.confirmationAlertConfig)}`;
  }

  /**
   * Initalizes an arrays containing the ids of disabled alerts.
   *
   * @returns {void}
   */
  private initializeDeactivatedConfirmationAlerts() {
    this.disabledAlertsInstanceIds = JSON.parse(localStorage
      .getItem('disabledAlerts'));
  }

  /**
   * It checked if an instance of a modal is disabled
   * It is called when the 'do not show this again
   * checkbox is clicked.
   *
   * @returns {boolean}
   */
  private isAlertInstanceDeactivated(): boolean {
    if (this.disabledAlertsInstanceIds &&
      this.disabledAlertsInstanceIds.includes(this.alertInstanceId)) {
      return true;
    }

    return false;
  }
}
