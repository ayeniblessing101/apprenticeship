import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';

@Injectable()
export class SkillMentorsResolver implements Resolve<any> {
  constructor (private router: Router, private userService: UserService) {};

  /**
   * Resolve mentors data on a given route
   *
   * @param {ActivatedRouteSnapshot} route the route to resolve
   *
   * @return {Observable}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.userService.getSkillMentors(route.params['id'])
    .catch((error) => {
      this.router.navigateByUrl('/page-not-found')
      return error;
    });
  }
}

