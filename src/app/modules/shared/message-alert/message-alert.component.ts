import { Component, EventEmitter, Output,  Input, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-message-alert',
  templateUrl: './message-alert.component.html',
  styleUrls: ['./message-alert.component.scss'],
})
export class MessageAlertComponent {
  @Input() message: string;
  @Output() onClose = new EventEmitter<null>();


  /**
   * Close the alert
   *
   * @return {void}
   */
  close(): void {
    this.onClose.emit();
  }
}
