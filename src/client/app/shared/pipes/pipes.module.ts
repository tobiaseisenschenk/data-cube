import { NgModule } from '@angular/core';
import { GenericStringFilter } from './genericStringFilter';
import { GetNamePipe } from './getNamePipe';
import { EvaluationsByIdFilter } from './evaluationsByIdFilter';
import { ToNumericValuePipe } from './toNumericValuePipe';
import { ToStringValuePipe } from './toStringValuePipe';

@NgModule({
  imports: [],
  declarations: [GenericStringFilter, GetNamePipe, EvaluationsByIdFilter, ToNumericValuePipe, ToStringValuePipe],
  exports: [GenericStringFilter, GetNamePipe, EvaluationsByIdFilter, ToNumericValuePipe, ToStringValuePipe]
})
export class PipesModule {
}
