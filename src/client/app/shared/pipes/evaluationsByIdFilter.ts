import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'evaluationsByIdFilter'
})
export class EvaluationsByIdFilter implements PipeTransform {
  transform(contentArray: Array<any>, idArray: Array<number>) {
    if (!Array.isArray(idArray) || !idArray || idArray === undefined || idArray.length === 0) return null;
    if (!Array.isArray(contentArray) || !contentArray || contentArray === undefined ||
      contentArray.length === 0) return null;
    return contentArray
      .filter((obj: any) => {
        let result :boolean;
        for (let id of idArray) {
          if (id === obj.project_id) {
            result = true;
            break;
          } else result = false;
        }
        return result;
      });
  }

}
