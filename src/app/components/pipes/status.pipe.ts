import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusFilter',
  pure: false,
})
export class StatusPipe implements PipeTransform {
  transform(requests: any[], checkedStatuses: any[]): any {
    if (!requests || requests === undefined) {
      return [];
    } else {
      if (checkedStatuses.length === 0) {
        return requests;
      }
      console.log('We in status');
      return requests.filter((request) => {
        console.log('We are in status filter')
        return checkedStatuses.includes(request.status);
      });
    }
  }
}
