import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../../services/helper.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {

  currentUser: Object;

  constructor(
    private helperService: HelperService,
  ) { }

  ngOnInit() {
    this.currentUser = this.getCurrentUser();
  }

  /**
   * Get current user details
   *
   * @return {Object} current user details
   */
  getCurrentUser() {
    return this.helperService.getCurrentUser();
  }
}
