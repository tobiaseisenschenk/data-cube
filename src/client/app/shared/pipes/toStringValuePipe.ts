import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'toStringValuePipe'
})
export class ToStringValuePipe implements PipeTransform {
  transform(value :number) {
    if (!value || value === undefined || value < 1 || value > 5) return null;
    let degreeOptions = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
    let index :number = Math.round(value) -1;
    return degreeOptions[index];
  }
}
