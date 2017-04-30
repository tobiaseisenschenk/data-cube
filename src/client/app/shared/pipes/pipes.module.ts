import { NgModule } from '@angular/core';
import { GenericStringFilter } from './genericStringFilter';
import { GetNamePipe } from './getNamePipe';

@NgModule({
  imports: [],
  declarations: [GenericStringFilter, GetNamePipe],
  exports: [GenericStringFilter, GetNamePipe]
})
export class PipesModule {
}
