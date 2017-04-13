import { Pipe, PipeTransform } from '@angular/core';

import { ArrayIntersectPipe } from './array-intersect.pipe'

@Pipe({
  name: 'skillsFilter',
  pure: false
})
export class SkillsPipe implements PipeTransform {

  transform(requests: any[], filteredSkills: any[]): any {
    if (!requests || requests === undefined) {
      return [];
    } else {
      if (filteredSkills.length === 0) {
        return requests;
      }
      return requests.filter(request => {
        return ArrayIntersectPipe.get(request.skills, filteredSkills).length >= filteredSkills.length;
      });
    }
  }
}
