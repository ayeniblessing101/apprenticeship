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
import { RequestResolver } from '../../resolvers/request.resolver';
import { FileService } from '../../services/files.service';

import { SaveFiltersModalComponent } from './save-filters-modal/save-filters-modal.component';
import { PoolComponent } from './pool/pool.component';
import { PoolRecordsComponent } from './pool-records/pool-records.component';
import { PoolFiltersComponent } from './pool-filters/pool-filters.component';
import { PendingComponent } from './pending/pending.component';
import { HistoryComponent } from './history/history.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { RequestDetailsModalComponent } from './request-details-modal/request-details-modal.component';
import { PendingModalComponent } from './pending-modal/pending-modal.component';
import { PendingRequestsTableComponent } from './pending-requests-table/pending-requests-table.component';
import { NoSearchResultComponent } from './no-search-result/no-search-result.component';
import { InProgressSingleViewComponent } from './in-progress/in-progress-single-view/in-progress-single-view.component';
import { CancelRequestModalComponent } from './cancel-request-modal/cancel-request-modal.component';
import { CalendarComponent } from './in-progress/calendar/calendar.component';
import { SessionService } from '../../services/session.service';
import { RequestDetailsPageComponent } from './request-details-page/request-details-page.component';
import { RequestSchedulePageComponent } from './request-schedule-page/request-schedule-page.component';
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { ProposedRequestDurationPipe } from '../../pipes/proposed-request-duration.pipe';
import { RequestDurationPipe } from '../../pipes/request-duration.pipe';
import { RequestSkillPipe } from '../../pipes/request-skills-pipe';
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
    RequestDetailsModalComponent,
    PendingModalComponent,
    PendingRequestsTableComponent,
    PoolRecordsComponent,
    InProgressSingleViewComponent,
    CancelRequestModalComponent,
    CalendarComponent,
    RequestDetailsPageComponent,
    RequestSchedulePageComponent,
    FilterDropdownComponent,
    HistoryPageComponent,
    ProposedRequestDurationPipe,
    RequestDurationPipe,
    RequestSkillPipe,
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
    FileService,
    RequestResolver,
  ],
})
export class RequestPoolModule { }
