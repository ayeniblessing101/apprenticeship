import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StarRatingModule } from 'angular-star-rating';

import { PendingRequestsTableComponent } from './pending-requests-table.component';
import { PendingModalComponent } from './../pending-modal/pending-modal.component';
import { CancelRequestModalComponent } from '../cancel-request-modal/cancel-request-modal.component';


import { HttpService as Http } from './../../../services/http.service';
import { RequestService } from './../../../services/request.service';
import { RequestServiceStub } from './../../../stubs/request-stub.service';

import { UserService } from './../../../services/user.service';
import { NoResultComponent } from '../../shared/no-result/no-result.component';
import { ProposedRequestDurationPipe } from '../../../pipes/proposed-request-duration.pipe';
import { RequestDurationPipe } from '../../../pipes/request-duration.pipe';
import { RequestSkillPipe } from '../../../pipes/request-skills-pipe';
import { SetRequestHeaderIconDirective } from '../../../directives/set-request-header-icon.directive';
import { TableHeaderSortHelper } from '../../../helpers/table-header-sort.helper';


describe('PendingRequestsTableComponent', () => {
  let component: PendingRequestsTableComponent;
  let fixture: ComponentFixture<PendingRequestsTableComponent>;
  let proposedRequestDuration: ProposedRequestDurationPipe;
  let requestDuration: RequestDurationPipe;
  let requestSkill: RequestSkillPipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        StarRatingModule,
      ],
      declarations: [
        PendingModalComponent,
        PendingRequestsTableComponent,
        CancelRequestModalComponent,
        SetRequestHeaderIconDirective,
        ProposedRequestDurationPipe,
        RequestDurationPipe,
        RequestSkillPipe,
        NoResultComponent,
      ],
      providers: [
        UserService,
        TableHeaderSortHelper,
        Http,
        { provide: RequestService, useClass: RequestServiceStub },
        RequestService,
      ],
    })
      .compileComponents();
    proposedRequestDuration = new ProposedRequestDurationPipe;
    requestDuration = new RequestDurationPipe;
    requestSkill = new RequestSkillPipe;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
