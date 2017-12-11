import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { ConfirmationAlertConfiguration } from '../../../interfaces/confirmation-alert-configuration.interface';


@Component({
  selector: 'app-confirmation-alert',
  templateUrl: './confirmation-alert.component.html',
  styleUrls: ['./confirmation-alert.component.scss'],
})
export class ConfirmationAlertComponent {

  @Input() config: ConfirmationAlertConfiguration;
  @Input() invokingComponent: object;
  @Input() message: string;
  @Input() isDeactivated: boolean;
  @Input() alertInstanceId: string;


  @Output() onClose = new EventEmitter<null>();

  /**
   * It disables the the delete confirmation modal.
   * It is called when the 'do not show this again
   * checkbox is clicked.
   *
   * @returns {void}
   */
  toggleActivatedState(): void {
    let disabledAlerts = JSON.parse(localStorage
      .getItem('disabledAlerts'));

    if (disabledAlerts === null || disabledAlerts.length < 1) {
      disabledAlerts = [this.alertInstanceId];
    } else if (!disabledAlerts.includes(this.alertInstanceId)) {
      disabledAlerts.push(this.alertInstanceId);
    } else {
      const indexOfAlert = disabledAlerts.indexOf(this.alertInstanceId);
      disabledAlerts.splice(indexOfAlert, 1);
    }

    localStorage.setItem('disabledAlerts', JSON.stringify(disabledAlerts));
  }

  /**
   * Close the alert
   *
   * @returns {void}
   */
  close(): void {
    this.onClose.emit()
  }

  /**
   * class alert service confirm method which
   * inturn calls the method passed in modal configuration
   *
   * @return {void}
   */
  confirm() {
    this.config.confirmAction();
    this.close();
    if (this.config.afterClose) {
      this.config.afterClose();
    }
  };
}
