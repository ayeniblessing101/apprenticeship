import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  errorMessage: string;
  userData: any;
  testId: string;
  userSkills: any;
  userId: string;
  picture: string;
  firstName: string;
  fullName: string;

  constructor(
    private _auth: AuthService,
    private _userService: UserService,
    private _skillService: SkillService
  ) {
    this.userId = this._auth.userInfo.id;
    this.testId = '6';
    this.picture = this._auth.userInfo.picture;
    this.firstName = this._auth.userInfo.first_name;
    this.fullName = this._auth.userInfo.name;
  }

  ngOnInit() {
    this.getUserInfo(this.userId);
    this.getUserSkills(this.testId);
  }

   /**
   *  gets a user's information based on their userId
   *
   * @param {String} userId - the id of the logged in user
   * @return {Void}
   */
  getUserInfo(userId: string): void {
    this._userService.getUserInfo(this.userId)
      .subscribe(
        (requests) => this.userData = requests,
        error => this.errorMessage = <any>error
      );
  }

  /**
   *  gets a user's skills based on thier userId
   *
   * @param {String} testId - the id of the logged in user
   * @return {Void}
   */
  getUserSkills(testId: String): void {
    this._skillService.getUserSkills(this.testId)
      .subscribe(
        (requests) => this.userSkills = requests,
        error => this.errorMessage = <any>error
      );
  }
}
