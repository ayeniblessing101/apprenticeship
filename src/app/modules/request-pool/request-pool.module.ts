import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { StarRatingModule } from 'angular-star-rating';
import {
  MdCheckboxModule,
  MdSelectModule,
  MdRadioModule,
  MdSliderModule,
  MdCardModule,
} from '@angular/material';

import { SaveFiltersModalComponent } from './save-filters-modal/save-filters-modal.component';
import { PoolComponent } from './pool/pool.component';
import { PoolFiltersComponent } from './pool-filters/pool-filters.component';
import { SharedModule } from '../shared/shared.module';
import { HistoryComponent } from './history/history.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { RequestService } from '../../services/request.service';


@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    MdCheckboxModule,
    MdSelectModule,
    MdRadioModule,
    MdSliderModule,
    MdCardModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    StarRatingModule.forRoot(),
  ],
  declarations: [
    SaveFiltersModalComponent,
    PoolComponent,
    InProgressComponent,
    PoolFiltersComponent,
    HistoryComponent,
  ],
  exports: [
    PoolComponent,
    PoolFiltersComponent,
    SaveFiltersModalComponent,
  ],
  providers: [
    SaveFiltersModalComponent,
    RequestService,
  ],
})
export class RequestPoolModule { }
