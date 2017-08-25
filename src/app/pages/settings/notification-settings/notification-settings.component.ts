import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { AuthService } from '../../../services/auth.service';
import { NotificationSettingsService } from '../../../services/notifications-settings.service';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.scss']
})
export class NotificationSettingsComponent implements OnInit {

  userId: string;
  userSettings: object;
  error: string;
  response: object;
  notificationRegex: object;

  constructor(
    private authService: AuthService,
    private settingsService: NotificationSettingsService,
    private snackBar: MdSnackBar
  ) {
    this.userId = this.authService.userInfo.id;
    // enable replacement of all occurrences of underscore
    this.notificationRegex = /_/g;
  }

  ngOnInit() {
    // fetch user settings to display on page load
    this.settingsService.getUserSettings(this.userId)
      .toPromise()
      .then((response) => this.userSettings = response)
      .catch((error) => this.error = error);
  }

  /**
   * Send request to update user settings
   *
   * @param {string} settingId the unique setting ID
   * @param {object} values    the request payload
   */
  updateUserSettings(settingId, values) {
    values.user_id = this.userId;
    values.id = settingId;
    this.settingsService.updateUserSettings(this.userId, settingId, values)
      .toPromise()
      .then((response) => {
        this.response = response;
        this.snackBar.open(
          'Settings updated successfully',
          'Close', {
            duration: 8000,
          });
      })
      .catch((error) => {
        this.error = error;
        this.snackBar.open(
          'An error occurred, try again',
          'Close', {
            duration: 8000,
          });
      });
  }
}
