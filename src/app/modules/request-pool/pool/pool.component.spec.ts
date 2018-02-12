import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdRadioModule, MdSelectModule, MdCheckboxModule } from '@angular/material';
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
import { SkillService } from '../../../services/skill.service';
import { SaveFiltersModalComponent } from 'app/modules/request-pool/save-filters-modal/save-filters-modal.component';

import { RequestDetailsModalComponent } from '../request-details-modal/request-details-modal.component';
import { StarRatingModule } from 'angular-star-rating';
import { NoSearchResultComponent } from '../no-search-result/no-search-result.component';
import { FilterDropdownComponent } from '../filter-dropdown/filter-dropdown.component';
import { ProposedRequestDurationPipe } from '../../../pipes/proposed-request-duration.pipe';
import { RequestDurationPipe } from '../../../pipes/request-duration.pipe';
import { RequestSkillPipe } from '../../../pipes/request-skills-pipe';
import { SaveFiltersComponent } from '../save-filters/save-filters.component';

describe('PoolComponent', () => {
  let component: PoolComponent;
  let fixture: ComponentFixture<PoolComponent>;
  let pageTitle: HTMLElement;
  let proposedRequestDuration: ProposedRequestDurationPipe;
  let requestDuration: RequestDurationPipe;
  let requestSkill: RequestSkillPipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        InfiniteScrollModule,
        HttpModule,
        ReactiveFormsModule,
        MdRadioModule,
        FormsModule,
        MdSelectModule,
        MdCheckboxModule,
        StarRatingModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        PoolComponent,
        PoolFiltersComponent,
        SaveFiltersModalComponent,
        RequestDetailsModalComponent,
        NoSearchResultComponent,
        PoolRecordsComponent,
        FilterDropdownComponent,
        ProposedRequestDurationPipe,
        RequestDurationPipe,
        RequestSkillPipe,
        SaveFiltersComponent,
      ],
      providers: [
        Http,
        { provide: RequestService, useClass: RequestServiceStub },
        RequestService,
        FilterService,
        UserService,
        SkillService,
      ],
    })
      .compileComponents();
    proposedRequestDuration = new ProposedRequestDurationPipe;
    requestDuration = new RequestDurationPipe;
    requestSkill = new RequestSkillPipe;
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

