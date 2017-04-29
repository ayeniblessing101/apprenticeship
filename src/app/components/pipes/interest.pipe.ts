import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'interestFilter',
  pure: false
})
export class InterestPipe implements PipeTransform {
  transform(requests: any[], interestedStatus) {
    if (!requests || requests === undefined) {
      return [];
    } else {
      if (!interestedStatus.length) {
        return requests;
      }
      return requests.filter(request =>
        request.interested.includes(interestedStatus[0])
      );
    }
  }
}
