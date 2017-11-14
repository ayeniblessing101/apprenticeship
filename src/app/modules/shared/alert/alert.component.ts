import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  isOpen = false;
  message: string;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertService.registerAlert(this);
  }

  /**
   * Close the alert
   *
   * @memberof AlertComponent
   */
  close(): void {
    this.alertService.close();
  }
}
