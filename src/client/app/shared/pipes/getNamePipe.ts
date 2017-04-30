import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'getNamePipe'
})
export class GetNamePipe implements PipeTransform {
  transform(contentArray: Array<any>, idArray: Array<number>) {
    if (!Array.isArray(idArray) || !idArray || idArray === undefined || idArray.length === 0) return null;
    if (!Array.isArray(contentArray) || !contentArray || contentArray === undefined ||
        contentArray.length === 0) return null;
    return contentArray
      .filter((obj: any) => {
        let result :boolean;
        for (let id of idArray) {
          if (id === obj.id) {
            result = true;
            break;
          } else result = false;
        }
        return result;
      })
      .map((obj :any) => {
        return obj.name;
      });
  }

}
