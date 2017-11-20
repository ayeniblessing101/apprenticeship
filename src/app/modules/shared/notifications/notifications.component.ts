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
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @Input() state = false;
  constructor() { }

  ngOnInit() {
  }

  /**
   * closes the notifications component
   *
   * @return {void}
   */
  closeNotifications() {
    this.onClose.emit(false);
  }
}
