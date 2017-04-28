import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'genericStringFilter'
})
export class GenericStringFilter implements PipeTransform {
  transform(array: Array<any>, searchString: string) {
    if (!Array.isArray(array) || (typeof searchString) !== 'string' ||
        !array || array === undefined || array.length === 0) return null;
    return array
      .filter((obj: any) => {
        let result :boolean;
        let normSearchString = searchString.toLowerCase();
        for (let key of Object.keys(obj)) {
          if (typeof obj[key] === 'string') {
            if (obj[key].toLowerCase().includes(normSearchString)) {
              result = true;
              break;
            } else {
              result = false;
            }
          }
        }
        return result;
      });
  }

}
