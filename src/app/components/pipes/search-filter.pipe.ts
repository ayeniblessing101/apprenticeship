import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(dataSet: any[], term?: any): any {
    // check if search term is undefined
    if (term === undefined) return dataSet;

    // return updated dataSet array
    return dataSet.filter(function (dataSetElement) {
      return dataSetElement.name.toLowerCase().includes(term.toLowerCase().trim());
    })
  }

}
