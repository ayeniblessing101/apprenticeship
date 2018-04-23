import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class  AuthGuard implements CanActivate {
  constructor (private auth: AuthService, private router: Router) { }

  private isEmpty(obj) {
    return Object.getOwnPropertyNames(obj).length === 0;
  }

  /**
   * Verifies if the user email is an andelan email.
   *
   * @returns {void}
   */
  verifyEmail() {
    const queryParams = new URLSearchParams(window.location.search.slice(1));
    if (queryParams.has('error')) {
      this.auth.changeNotice('invalid email');
      this.router.navigate(['/login']);
    }
  }

  /**
  *  canActivate
  *
  *  This method checks whether a user is logged in by checking if the id_token
  *  stored localStorage is valid and has not expired. It also checks the
  *  permissions of the user in the stored JWT token.
  */
  canActivate() {
    this.verifyEmail();

    if (this.auth.loggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
