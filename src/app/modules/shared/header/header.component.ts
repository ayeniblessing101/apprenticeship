import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  displayNotifications: boolean;

  constructor() { }

  ngOnInit() {
    this.displayNotifications = false;
  }

  /**
   * Opens the notifications component
   *
   * @param {void}
   * @return {void}
   */
  openNotifications() {
    this.displayNotifications = true;
  }

  /**
   * Closes the notifications component
   *
   * @param {$event} event onClose event for closing notifications component
   * @return {void}
   */
  closeNotifications() {
    this.displayNotifications = false;
  }
}
