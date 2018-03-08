import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SkillService } from '../services/skill.service';

@Injectable()
export class SkillsResolver implements Resolve<any> {
  constructor(private skillService: SkillService) { }

  /**
   * It resolves the skills data on a given route.
   *
   * @return {Observable}
   */
  resolve(): Observable<any> {
    return this.skillService.getSkills();
  }
}
