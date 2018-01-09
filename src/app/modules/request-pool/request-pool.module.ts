import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
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
import { PoolRecordsComponent } from './pool-records/pool-records.component';
import { PoolFiltersComponent } from './pool-filters/pool-filters.component';
import { PendingComponent } from './pending/pending.component';
import { HistoryComponent } from './history/history.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { RequestService } from '../../services/request.service';
import { SkillService } from '../../services/skill.service';
import { PendingModalComponent } from './pending-modal/pending-modal.component';
import { PendingRequestsTableComponent } from './pending-requests-table/pending-requests-table.component';
import { NoSearchResultComponent } from './no-search-result/no-search-result.component';
import { InProgressSingleViewComponent } from './in-progress/in-progress-single-view/in-progress-single-view.component';

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
    PendingComponent,
    NoSearchResultComponent,
    RequestDetailsComponent,
    PendingModalComponent,
    PendingRequestsTableComponent,
    PoolRecordsComponent,
    InProgressSingleViewComponent,
  ],
  exports: [
    PoolComponent,
    PoolFiltersComponent,
    SaveFiltersModalComponent,
    PoolRecordsComponent,
  ],
  providers: [
    SaveFiltersModalComponent,
    RequestService,
    SkillService,
  ],
})
export class RequestPoolModule { }
