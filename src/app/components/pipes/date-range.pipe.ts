import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRangeFilter',
  pure: false
})
export class DateRangePipe implements PipeTransform {

  transform(requests: any[], dateRange: number): any {
    console.log(dateRange);
    if (!requests || requests === undefined) {
      return [];
    } else {
      if (dateRange === 0) {
        return requests;
      }
      return requests.filter(request => {
        return (Number(Date.now()) - Number(new Date(request.created_at))) <= (86400000 * dateRange);
      });
    }
  }
}
