import { Pipe, PipeTransform } from '@angular/core';
import { ArrayIntersectPipe } from './array-intersect.pipe';
import { SkillService } from '../../services/skill.service';

@Pipe({
  name: 'skillsFilter',
  pure: false,
})
export class SkillsPipe implements PipeTransform {

  constructor(public skillService: SkillService) { }

  transform(requests: any[], filteredSkills: any[]): any {
    if (!requests || requests === undefined) {
      return [];
    } else {
      if (filteredSkills.length === 0) {
        return requests;
      }
      return requests.filter((request) => {
        const primarySkills = request.request_skills.filter(skill => skill.type === 'primary');
        const requestSkills = this.skillService.extractSkills(primarySkills);

        return ArrayIntersectPipe.get(requestSkills, filteredSkills).length > 0;
      });
    }
  }
}
