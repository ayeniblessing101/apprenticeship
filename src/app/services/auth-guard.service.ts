import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class  AuthGuard implements CanActivate {
  constructor (private auth: AuthService, private router: Router) { }

  private isEmpty(obj) {
    return Object.getOwnPropertyNames(obj).length === 0;
  }

  /**
  *  canActivate
  *
  *  This method checks whether a user is logged in by checking if the id_token
  *  stored localStorage is valid and has not expired. It also checks the
  *  permissions of the user in the stored JWT token.
  */
  canActivate() {
    if (this.auth.loggedIn()) {
      this.auth.decodeToken();

      if (this.auth.userInfo.roles.Guest) {
        this.auth.changeNotice('permission');
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }
}
