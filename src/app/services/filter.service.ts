import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Response, Http } from '@angular/http';
import { environment } from '../../env';
import 'rxjs/add/operator/map';
import 'rxjs/'

@Injectable()
export class FilterService {
  private apiBaseUrl = environment.apiBaseUrl;  // URL to web API
  // Publishes new result to other observables and subscribes to incoming results
  statusResult = new Subject<Object[]>();
  skills: any;

  constructor(private http: Http) {}

  /**
   * Return a unique list of all skills that have requests
   *
   * @return Observable collection of skills
   */
  getSkillsWithRequests(): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}/v2/skills/request-skills`)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw(error.json()));
  }
}
