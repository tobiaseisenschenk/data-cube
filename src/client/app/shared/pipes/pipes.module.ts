import { NgModule } from '@angular/core';
import { GenericStringFilter } from './genericStringFilter';
import { GetNamePipe } from './getNamePipe';
import { EvaluationsByIdFilter } from './evaluationsByIdFilter';

@NgModule({
  imports: [],
  declarations: [GenericStringFilter, GetNamePipe, EvaluationsByIdFilter],
  exports: [GenericStringFilter, GetNamePipe, EvaluationsByIdFilter]
})
export class PipesModule {
}
