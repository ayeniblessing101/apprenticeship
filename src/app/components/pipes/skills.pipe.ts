import { Pipe, PipeTransform } from '@angular/core';
import { ArrayIntersectPipe } from './array-intersect.pipe';
import { HelperService as Helper } from '../../services/helper.service';

@Pipe({
  name: 'skillsFilter',
  pure: false
})
export class SkillsPipe implements PipeTransform {

  constructor(public helper: Helper) { }

  transform(requests: any[], filteredSkills: any[]): any {
    if (!requests || requests === undefined) {
      return [];
    } else {
      if (filteredSkills.length === 0) {
        return requests;
      }
      return requests.filter(request => {
        const requestSkills = this.helper.extractSkills(request.request_skills);
        return ArrayIntersectPipe.get(requestSkills, filteredSkills).length >= filteredSkills.length;
      });
    }
  }
}
