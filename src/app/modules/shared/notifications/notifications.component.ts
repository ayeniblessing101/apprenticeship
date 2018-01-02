import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [trigger('notificationsState', [
    state('true', style({
      transform: 'translateX(0%)',
    })),
    state('false', style({
      transform: 'translateX(100%)',
    })),
    transition('1 <=> 0', animate('500ms ease-in-out')),
  ])],
})
export class NotificationsComponent implements OnInit {
  @Output() close: EventEmitter<null> = new EventEmitter();
  @Input() state = false;
  constructor() { }

  ngOnInit() {
  }

  /**
   * closes the notifications component
   *
   * @param {Event} event Native DOM event
   *
   * @return {void}
   */
  closeNotifications(event) {
    event.preventDefault();
    if (event.target.id === 'notification-overlay' || event.target.id === 'notification-close-x') {
      this.close.emit(null);
    }
  }
}
