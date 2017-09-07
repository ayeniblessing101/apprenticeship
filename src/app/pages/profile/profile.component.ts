import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  errorMessage: string;
  userData: any;
  testId: string;
  userId: string;
  picture: string;
  firstName: string;
  fullName: string;
  skillsTitle: string;
  routeParam: string;
  cohort: string;
  loggedHours: number;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private helper: HelperService,
    private route: ActivatedRoute
  ) {
    this.userId = this.authService.userInfo.id;
  }

  ngOnInit() {
    this.getUserInfo();
  }

  /**
   * getUserInfo
   *
   * Gets a user's information from local storage
   */
  getUserInfo() {
    const currentUser = this.helper.getCurrentUser();
    this.userData = currentUser;
    this.userId = currentUser.id;
    this.picture = currentUser.picture;
    this.firstName = currentUser.first_name;
    this.fullName = currentUser.name;
    this.cohort = currentUser.cohort.name;
    this.skillsTitle = currentUser.skills.length > 1 ? 'YOUR SKILLS' : 'YOUR SKILL';
    this.loggedHours = currentUser.logged_hours;
  }
}
