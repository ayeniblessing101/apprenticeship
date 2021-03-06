import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { RequestService } from '../../services/request.service';
import { SessionService } from '../../services/session.service';
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
import { PendingModalComponent } from './pending-modal/pending-modal.component';
import { PendingRequestsTableComponent } from './pending-requests-table/pending-requests-table.component';
import { InProgressSingleViewComponent } from './in-progress-single-view/in-progress-single-view.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RequestDetailsPageComponent } from './request-details-page/request-details-page.component';
import { RequestSchedulePageComponent } from './request-schedule-page/request-schedule-page.component';
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { SaveFiltersComponent } from './save-filters/save-filters.component';
import { MatchPoolHeaderWidthToParentDirective } from '../../directives/match-pool-header-width-to-parent-directive';
import { LogSessionModalComponent } from './log-session-modal/log-session-modal.component';
import { SessionDetailsComponent } from './session-details/session-details.component';
import { AddFileModalComponent } from './add-file-modal/add-file-modal.component';
import { UploadFileDirective } from './add-file-modal/upload-file.directive';
import { SetRequestHeaderIconDirective } from '../../directives/set-request-header-icon.directive';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';
import { ConfirmSessionModalComponent } from './confirm-session-modal/confirm-session-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SaveFiltersModalComponent,
    PoolComponent,
    InProgressComponent,
    PoolFiltersComponent,
    HistoryComponent,
    PendingComponent,
    PendingModalComponent,
    PendingRequestsTableComponent,
    PoolRecordsComponent,
    InProgressSingleViewComponent,
    CalendarComponent,
    RequestDetailsPageComponent,
    RequestSchedulePageComponent,
    FilterDropdownComponent,
    HistoryPageComponent,
    SaveFiltersComponent,
    MatchPoolHeaderWidthToParentDirective,
    LogSessionModalComponent,
    SessionDetailsComponent,
    AddFileModalComponent,
    UploadFileDirective,
    SetRequestHeaderIconDirective,
    ConfirmSessionModalComponent,
    InfiniteScrollDirective,
  ],
  exports: [
    PoolComponent,
    PoolFiltersComponent,
    SaveFiltersModalComponent,
    PoolRecordsComponent,
    CalendarComponent,
    LogSessionModalComponent,
    MatchPoolHeaderWidthToParentDirective,
    SetRequestHeaderIconDirective,
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
