import { NgModule } from '@angular/core';
import { GenericStringFilter } from './genericStringFilter';
import { GetNamePipe } from './getNamePipe';
import { EvaluationsByIdFilter } from './evaluationsByIdFilter';
import { ToNumericValuePipe } from './toNumericValuePipe';

@NgModule({
  imports: [],
  declarations: [GenericStringFilter, GetNamePipe, EvaluationsByIdFilter, ToNumericValuePipe],
  exports: [GenericStringFilter, GetNamePipe, EvaluationsByIdFilter, ToNumericValuePipe]
})
export class PipesModule {
}
