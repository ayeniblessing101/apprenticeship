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
import { RequestDetailsModalComponent } from 'app/modules/request-pool/request-details-modal/request-details-modal.component';
import { NoSearchResultComponent } from '../no-search-result/no-search-result.component';
import { ProposedRequestDurationPipe } from '../../../pipes/proposed-request-duration.pipe';
import { RequestDurationPipe } from '../../../pipes/request-duration.pipe';
import { RequestSkillPipe } from '../../../pipes/request-skills-pipe';

describe('PoolRecordsComponent', () => {
  let component: PoolRecordsComponent;
  let fixture: ComponentFixture<PoolRecordsComponent>;
  let pageTitle: HTMLElement;
  let proposedRequestDuration: ProposedRequestDurationPipe;
  let requestDuration: RequestDurationPipe;
  let requestSkill: RequestSkillPipe;

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
        RequestDetailsModalComponent,
        NoSearchResultComponent,
        ProposedRequestDurationPipe,
        RequestDurationPipe,
        RequestSkillPipe,
      ],
      providers: [
        Http,
        { provide: RequestService, useClass: RequestServiceStub },
        RequestService,
        FilterService,
      ],
    })
      .compileComponents();
    proposedRequestDuration = new ProposedRequestDurationPipe;
    requestDuration = new RequestDurationPipe;
    requestSkill = new RequestSkillPipe;
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
