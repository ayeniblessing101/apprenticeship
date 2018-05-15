import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search/search-page.component';
import { SharedModule } from '../shared/shared.module';
import { SearchRoutesModule } from './search-routes.module';
import { SearchService } from '../../services/search.service';

@NgModule({
  declarations: [SearchPageComponent],
  imports: [
    CommonModule,
    SearchRoutesModule,
    SharedModule,
  ],
  exports: [],
  providers: [
    SearchService,
  ],
})
export class SearchModule {}
