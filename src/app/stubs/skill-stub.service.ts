import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import mockSkills from '../mocks/skills';

import 'rxjs/add/observable/of';

@Injectable()
export class SkillServiceStub {

  constructor() { }

  /**
   * Return all skills in the database
   *
   * @return Observable collection of skills
   */
  getSkills(): Observable<any> {
    return Observable.of(mockSkills);
  }
  /**
   * Return skills status count
   *
   * @return Observable collection of skills
   */
  getSkillStatusCount(params: {}): Observable<any> {
    const skillStatusCount = [];
    return Observable.of(skillStatusCount);
  }
}
