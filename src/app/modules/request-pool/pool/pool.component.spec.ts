import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PoolComponent } from './pool.component';
import { RequestService } from './../../../services/request.service';
import { RequestServiceStub } from '../../../stubs/request-stub.service';
import { HttpService as Http } from '../../../services/http.service';
import { UserService } from '../../../services/user.service';
import { PoolFiltersComponent } from 'app/modules/request-pool/pool-filters/pool-filters.component';
import { PoolRecordsComponent } from 'app/modules/request-pool/pool-records/pool-records.component';
import { SharedModule } from '../../shared/shared.module';
import { FilterService } from '../../../services/filter.service';
import { AlertService } from '../../../services/alert.service';
import { SkillService } from '../../../services/skill.service';
import { SaveFiltersModalComponent } from 'app/modules/request-pool/save-filters-modal/save-filters-modal.component';
import { StarRatingModule } from 'angular-star-rating';
import { NoSearchResultComponent } from '../no-search-result/no-search-result.component';
import { FilterDropdownComponent } from '../filter-dropdown/filter-dropdown.component';
import { SaveFiltersComponent } from '../save-filters/save-filters.component';
import { SetRequestHeaderIconDirective } from '../../../directives/set-request-header-icon.directive';
import { TableHeaderSortHelper } from '../../../helpers/table-header-sort.helper';

describe('PoolComponent', () => {
  let component: PoolComponent;
  let fixture: ComponentFixture<PoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        InfiniteScrollModule,
        HttpModule,
        ReactiveFormsModule,
        FormsModule,
        StarRatingModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        PoolComponent,
        PoolFiltersComponent,
        SaveFiltersModalComponent,
        NoSearchResultComponent,
        PoolRecordsComponent,
        FilterDropdownComponent,
        SaveFiltersComponent,
        SetRequestHeaderIconDirective,
      ],
      providers: [
        Http,
        { provide: RequestService, useClass: RequestServiceStub },
        RequestService,
        FilterService,
        UserService,
        SkillService,
        AlertService,
        TableHeaderSortHelper,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a Pool Component', () => {
    expect(component).toBeTruthy();
  });
});

