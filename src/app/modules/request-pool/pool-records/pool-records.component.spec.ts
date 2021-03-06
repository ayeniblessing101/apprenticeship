import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { StarRatingModule } from 'angular-star-rating';
import { PoolRecordsComponent } from './pool-records.component';
import { RequestService } from './../../../services/request.service';
import { UserService } from './../../../services/user.service';
import { RequestServiceStub } from '../../../stubs/request-stub.service';
import { HttpService as Http } from '../../../services/http.service';
import { SharedModule } from '../../shared/shared.module';
import { FilterService } from '../../../services/filter.service';
import { SaveFiltersModalComponent } from 'app/modules/request-pool/save-filters-modal/save-filters-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetRequestHeaderIconDirective } from '../../../directives/set-request-header-icon.directive';
import { TableHeaderSortHelper } from '../../../helpers/table-header-sort.helper';
import { InfiniteScrollDirective } from '../../../directives/infinite-scroll.directive';

describe('PoolRecordsComponent', () => {
  let component: PoolRecordsComponent;
  let fixture: ComponentFixture<PoolRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpModule,
        ReactiveFormsModule,
        FormsModule,
        StarRatingModule,
      ],
      declarations: [
        PoolRecordsComponent,
        SaveFiltersModalComponent,
        SetRequestHeaderIconDirective,
        InfiniteScrollDirective,
      ],
      providers: [
        Http,
        { provide: RequestService, useClass: RequestServiceStub },
        RequestService,
        FilterService,
        TableHeaderSortHelper,
        UserService,
      ],
    })
      .compileComponents();
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
