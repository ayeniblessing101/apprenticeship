import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { StarRatingModule } from 'angular-star-rating';

import { PoolRecordsComponent } from './pool-records.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RequestService } from './../../../services/request.service';
import { RequestServiceStub } from '../../../stubs/request-stub.service';
import { HttpService as Http } from '../../../services/http.service';
import { SharedModule } from '../../shared/shared.module';
import { FilterService } from '../../../services/filter.service';
import { SaveFiltersModalComponent } from 'app/modules/request-pool/save-filters-modal/save-filters-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoSearchResultComponent } from '../no-search-result/no-search-result.component';
import { RequestDurationPipe } from '../../../pipes/request-duration.pipe';
import { SortingHelper } from '../../../helpers/sorting.helper';
import { SetRequestHeaderIconDirective } from '../../../directives/set-request-header-icon.directive';

describe('PoolRecordsComponent', () => {
  let component: PoolRecordsComponent;
  let fixture: ComponentFixture<PoolRecordsComponent>;
  let pageTitle: HTMLElement;
  let requestDuration: RequestDurationPipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        InfiniteScrollModule,
        SharedModule,
        HttpModule,
        ReactiveFormsModule,
        FormsModule,
        StarRatingModule,
      ],
      declarations: [
        PoolRecordsComponent,
        SaveFiltersModalComponent,
        NoSearchResultComponent,
        RequestDurationPipe,
        SetRequestHeaderIconDirective,
      ],
      providers: [
        Http,
        { provide: RequestService, useClass: RequestServiceStub },
        RequestService,
        FilterService,
        SortingHelper,
      ],
    })
      .compileComponents();
    requestDuration = new RequestDurationPipe;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolRecordsComponent);
    component = fixture.componentInstance;
    component.activeSortCategory = {};
    component.sortCategoryValues = {
      title: 'asc',
      duration: 'asc',
      location: 'asc',
      created_at: 'asc',
    };
    fixture.detectChanges();
  });

  it('should create a component Pool Records', () => {
    expect(component).toBeTruthy();
  });

});
