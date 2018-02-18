import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RequestService } from '../services/request.service';

@Injectable()
export class RequestResolver implements Resolve<any> {
  constructor(private requestService: RequestService, private router: Router) { }

  /**
   * It resolves the request data on a given route.
   *
   * @param {ActivatedRouteSnapshot} route the route to resolve.
   *
   * @return {Observable}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.requestService.getRequest(route.params['id'])
    .catch((error) => {
      this.router.navigate(['/page-not-found']);
      return error;
    })
  }
}
