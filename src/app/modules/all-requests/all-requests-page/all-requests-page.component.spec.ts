import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdRadioModule, MdSelectModule, MdCheckboxModule } from '@angular/material';
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
import { RequestDetailsModalComponent } from '../../request-pool/request-details-modal/request-details-modal.component';
import { SaveFiltersModalComponent } from 'app/modules/request-pool/save-filters-modal/save-filters-modal.component';
import { FilterService } from '../../../services/filter.service';
import { NoSearchResultComponent } from 'app/modules/request-pool/no-search-result/no-search-result.component';
import { FilterDropdownComponent } from '../../request-pool/filter-dropdown/filter-dropdown.component';


describe('AllRequestsPageComponent', () => {
  let component: AllRequestsPageComponent;
  let fixture: ComponentFixture<AllRequestsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        InfiniteScrollModule,
        ReactiveFormsModule,
        MdRadioModule,
        FormsModule,
        MdSelectModule,
        MdCheckboxModule,
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
        NoSearchResultComponent,
        FilterDropdownComponent,
      ],
      providers: [
        Http,
        { provide: RequestService, useClass: RequestServiceStub },
        RequestService,
        UserService,
        FilterService,
      ],
    })
    .compileComponents();
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
