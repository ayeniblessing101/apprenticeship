import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

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

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
    this.userId = this.authService.userInfo.id;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.routeParam = params['id'] ? params['id'] : this.userId;
      this.getUserInfo(this.routeParam);
    });
  }

  /**
   * Gets a user's information based on their userId
   *
   * @param {String} userId - the id of the logged in user
   * @return {Object}
   */
  getUserInfo(userId: string): void {
    this.userService.getUserInfo(userId)
      .subscribe(
        (requests) => {
          this.userData = requests;
          this.skillsTitle = requests.skills.length > 1 ? 'YOUR SKILLS' : 'YOUR SKILL';
          this.userId = requests.id;
          this.picture = requests.picture;
          this.firstName = requests.first_name;
          this.fullName = requests.name;
          this.cohort = requests.cohort.name;
        },
        error => this.errorMessage = <any>error
      );
  }
}
