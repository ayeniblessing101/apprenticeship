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
}
