import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {
  notice: string;
  userInfo = null;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor() {
    this.notice = null;
  }

  /**
  *  changeNotice
  *
  *  helper method that changes the notice variable
  *
  *  @param String value
  */
  changeNotice(value) {
    this.notice = value;
  }

  /**
  *  loggedIn
  *
  *  checks if the user is logged in using the id_token in the localStorage by
  *  checking that the token has not expired
  *
  */
  loggedIn() {
    if (!localStorage.getItem('id_token')) {
      return false
    }
    return tokenNotExpired();
  }

  
  /**
  *  decodeToken
  *
  *  decodes the id_token in the localStorage and stores the user information
  *  in the userInfo attribute
  *
  */
  decodeToken() {
    const token = localStorage.getItem('id_token');
    const info = this.jwtHelper.decodeToken(token);
    this.userInfo = info.UserInfo;
  }
}
