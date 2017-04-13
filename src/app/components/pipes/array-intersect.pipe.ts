import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayIntersect'
})
export class ArrayIntersectPipe implements PipeTransform {

  transform(array1: any, array2: any): any {
    return null;
  }

  /**
  * Evaluate the intersection of two collections
  *
  * @param {Array} array1 first collection
  * @param {Array} array2 second collection
  * @return {Array} the intersection
  */
  static get(array1, array2): Array<any> {
    return array1.filter(item => array2.includes(item));
  }
}
