import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { PoolComponent } from './pool.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RequestService } from './../../../services/request.service';
import { RequestServiceStub } from '../../../stubs/request-stub.service';
import { HttpService as Http } from '../../../services/http.service';
import { HelperService } from '../../../services/helper.service';
import { SharedModule } from '../../shared/shared.module';
import { FilterService } from '../../../services/filter.service';
import { SaveFiltersModalComponent } from 'app/modules/request-pool/save-filters-modal/save-filters-modal.component';
import { PoolFiltersComponent } from 'app/modules/request-pool/pool-filters/pool-filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MdRadioModule, MdSelectModule, MdCheckboxModule } from '@angular/material';

import { RequestDetailsComponent } from '../request-details/request-details.component';
import { StarRatingModule } from 'angular-star-rating';

describe('PoolComponent', () => {
  let component: PoolComponent;
  let fixture: ComponentFixture<PoolComponent>;
  let pageTitle: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
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
        PoolComponent,
        PoolFiltersComponent,
        SaveFiltersModalComponent,
        RequestDetailsComponent,
      ],
      providers: [
        Http,
        { provide: RequestService, useClass: RequestServiceStub },
        RequestService,
        FilterService,
        HelperService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

});
