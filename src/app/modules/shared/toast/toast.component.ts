import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ToastService } from 'app/services/toast.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
  type: string;
  message: string;
  showMessage: boolean;
  private subscription: Subscription;
  private timer: Observable<any>;

  constructor(private toast: ToastService) {
  }

  ngOnInit() {
    this.toast.registerToast(this);
  }

  ngOnDestroy() {
    if (this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Set showMessage to false to hide toast after the specified duration
   *
   * @return {void}
   */
  setTimer(duration) {
    this.showMessage = true;
    this.timer = Observable.timer(duration);
    this.subscription = this.timer.subscribe(() => {
      this.showMessage = false;
    });
  }

  /**
   * Shows a message toast
   *
   * @param {string} message toast message
   * @param {string} type toast type
   * @param {number} duration toast duration
   *
   * @return {void}
   */
  displayMessage(message: string, type = 'info', duration = 4000) {
    this.showMessage = true;
    this.type = type;
    this.message = message;
    this.setTimer(duration);
  }
}
