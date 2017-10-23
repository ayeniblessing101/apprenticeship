import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  /**
  *  canActivate
  *
  *  This method checks the permissions of the user that is logged in and
  *  checks if they have the LENKEN_ADMIN permissions.To enable access to
  *  the /admin route.
  *  If they don't have the permissions, the notice is set to unauthorized.
  *
  */
  canActivate() {
    if (!this.auth.userInfo.roles.LENKEN_ADMIN) {
      this.auth.changeNotice('unauthorized');
      this.router.navigate(['/request-pool']);

      return false;
    }

    return true;
  }
}

