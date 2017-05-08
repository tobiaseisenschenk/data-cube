import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'toNumericValuePipe'
})
export class ToNumericValuePipe implements PipeTransform {
  transform(value :string) {
    if (!value || value === undefined) return null;
    let degreeOptions = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
    return degreeOptions.indexOf(value) + 1;
  }
}
