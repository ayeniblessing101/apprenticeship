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

import { RequestService } from '../../services/request.service';
import { SkillService } from '../../services/skill.service';

import { SaveFiltersModalComponent } from './save-filters-modal/save-filters-modal.component';
import { PoolComponent } from './pool/pool.component';
import { PoolRecordsComponent } from './pool-records/pool-records.component';
import { PoolFiltersComponent } from './pool-filters/pool-filters.component';
import { PendingComponent } from './pending/pending.component';
import { HistoryComponent } from './history/history.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { PendingModalComponent } from './pending-modal/pending-modal.component';
import { PendingRequestsTableComponent } from './pending-requests-table/pending-requests-table.component';
import { NoSearchResultComponent } from './no-search-result/no-search-result.component';
import { InProgressSingleViewComponent } from './in-progress/in-progress-single-view/in-progress-single-view.component';
import { CancelRequestModalComponent } from './cancel-request-modal/cancel-request-modal.component';
import { CalendarComponent } from './in-progress/calendar/calendar.component';
import {SessionService} from '../../services/session.service';

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
    CancelRequestModalComponent,
    CalendarComponent,
  ],
  exports: [
    PoolComponent,
    PoolFiltersComponent,
    SaveFiltersModalComponent,
    PoolRecordsComponent,
    CalendarComponent,
  ],
  providers: [
    SaveFiltersModalComponent,
    RequestService,
    SessionService,
  ],
})
export class RequestPoolModule { }
