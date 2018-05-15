import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import { AllRequestsPageComponent } from './all-requests-page.component';
import { RequestStatisticsComponent } from '../request-statistics/request-statistics.component';
import { PoolComponent } from '../../request-pool/pool/pool.component';
import { PoolRecordsComponent } from 'app/modules/request-pool/pool-records/pool-records.component';
import { PoolFiltersComponent } from 'app/modules/request-pool/pool-filters/pool-filters.component';
import { RequestService } from './../../../services/request.service';
import { RequestServiceStub } from '../../../stubs/request-stub.service';
import { HttpService as Http } from '../../../services/http.service';
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';
import { RequestDetailsModalComponent } from '../../request-pool/request-details-modal/request-details-modal.component';
import { SaveFiltersModalComponent } from 'app/modules/request-pool/save-filters-modal/save-filters-modal.component';
import { FilterService } from '../../../services/filter.service';
import { NoResultComponent } from 'app/modules/shared/no-result/no-result.component';
import { FilterDropdownComponent } from '../../request-pool/filter-dropdown/filter-dropdown.component';
import { ProposedRequestDurationPipe } from '../../../pipes/proposed-request-duration.pipe';
import { RequestDurationPipe } from '../../../pipes/request-duration.pipe';
import { RequestSkillPipe } from '../../../pipes/request-skills-pipe';
import { SaveFiltersComponent } from '../../request-pool/save-filters/save-filters.component';
import { CalendarPickerComponent } from '../../shared/calendar/calendar-picker.component';
import { DropDownComponent } from '../../shared/drop-down/drop-down.component';
import { ExportButtonComponent } from '../../shared/export-button/export-button.component';
import { SetRequestHeaderIconDirective } from '../../../directives/set-request-header-icon.directive';
import { TableHeaderSortHelper } from '../../../helpers/table-header-sort.helper';
import { CSVDownloadHelper } from '../../../helpers/csv-download.helper';
import { InfiniteScrollDirective } from '../../../directives/infinite-scroll.directive';

import { DateRangePickerComponent } from '../../shared/date-range-picker/date-range-picker.component';
import { CancelRequestModalComponent } from '../../request-pool/cancel-request-modal/cancel-request-modal.component';

describe('AllRequestsPageComponent', () => {
  let component: AllRequestsPageComponent;
  let fixture: ComponentFixture<AllRequestsPageComponent>;
  let proposedRequestDuration: ProposedRequestDurationPipe;
  let requestDuration: RequestDurationPipe;
  let requestSkill: RequestSkillPipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        ReactiveFormsModule,
        FormsModule,
        StarRatingModule,
      ],
      declarations: [
        AllRequestsPageComponent,
        PoolComponent,
        PoolRecordsComponent,
        RequestStatisticsComponent,
        PoolFiltersComponent,
        RequestDetailsModalComponent,
        SaveFiltersModalComponent,
        NoResultComponent,
        FilterDropdownComponent,
        ProposedRequestDurationPipe,
        RequestDurationPipe,
        RequestSkillPipe,
        SaveFiltersComponent,
        CalendarPickerComponent,
        DropDownComponent,
        ExportButtonComponent,
        SetRequestHeaderIconDirective,
        InfiniteScrollDirective,
        DateRangePickerComponent,
        CancelRequestModalComponent,
      ],
      providers: [
        Http,
        CSVDownloadHelper,
        { provide: RequestService, useClass: RequestServiceStub },
        RequestService,
        UserService,
        FilterService,
        AlertService,
        TableHeaderSortHelper,
      ],
    })
      .compileComponents();
    proposedRequestDuration = new ProposedRequestDurationPipe;
    requestDuration = new RequestDurationPipe;
    requestSkill = new RequestSkillPipe;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRequestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a AllRequest Component', () => {
    expect(component).toBeTruthy();
  });
});
