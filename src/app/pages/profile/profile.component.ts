import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.userId = this.authService.userInfo.id;
    this.picture = this.authService.userInfo.picture;
    this.firstName = this.authService.userInfo.first_name;
    this.fullName = this.authService.userInfo.name;
  }

  ngOnInit() {
    this.getUserInfo(this.userId);
  }

   /**
   *  gets a user's information based on their userId
   *
   * @param {String} userId - the id of the logged in user
   * @return {Void}
   */
  getUserInfo(userId: string): void {
    this.userService.getUserInfo(this.userId)
      .subscribe(
        (requests) => {
          this.userData = requests;
          this.skillsTitle = requests.skills.length > 1 ? 'YOUR SKILLS' : 'YOUR SKILL';
        },
        error => this.errorMessage = <any>error
      );
  }
}
