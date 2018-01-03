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
import { MdRadioModule, MdSelectModule, MdCheckboxModule } from '@angular/material';
import { RequestDetailsComponent } from 'app/modules/request-pool/request-details/request-details.component';
import { NoSearchResultComponent } from '../no-search-result/no-search-result.component';


describe('PoolRecordsComponent', () => {
  let component: PoolRecordsComponent;
  let fixture: ComponentFixture<PoolRecordsComponent>;
  let pageTitle: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        InfiniteScrollModule,
        SharedModule,
        HttpModule,
        ReactiveFormsModule,
        MdRadioModule,
        FormsModule,
        MdSelectModule,
        MdCheckboxModule,
        StarRatingModule,
      ],
      declarations: [
        PoolRecordsComponent,
        SaveFiltersModalComponent,
        RequestDetailsComponent,
        NoSearchResultComponent,
      ],
      providers: [
        Http,
        { provide: RequestService, useClass: RequestServiceStub },
        RequestService,
        FilterService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a component Pool Records', () => {
    expect(component).toBeTruthy();
  });

});
