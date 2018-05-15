import { HttpService as Http } from './../../../services/http.service';
import { RequestServiceStub } from './../../../stubs/request-stub.service';
import { HttpModule } from '@angular/http';
import { StarRatingModule } from 'angular-star-rating';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingComponent } from './pending.component';
import { CancelRequestModalComponent } from '../cancel-request-modal/cancel-request-modal.component';
import { PendingModalComponent } from './../pending-modal/pending-modal.component';
import { PendingRequestsTableComponent } from './../pending-requests-table/pending-requests-table.component';
import { RequestService } from 'app/services/request.service';
import { UserService } from 'app/services/user.service';
import { ProposedRequestDurationPipe } from '../../../pipes/proposed-request-duration.pipe';
import { RequestDurationPipe } from '../../../pipes/request-duration.pipe';
import { RequestSkillPipe } from '../../../pipes/request-skills-pipe';
import { SetRequestHeaderIconDirective } from '../../../directives/set-request-header-icon.directive';
import { TableHeaderSortHelper } from '../../../helpers/table-header-sort.helper';
import { NoResultComponent } from '../../shared/no-result/no-result.component';

describe('PendingComponent', () => {
  let component: PendingComponent;
  let fixture: ComponentFixture<PendingComponent>;
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
        PendingComponent,
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
    fixture = TestBed.createComponent(PendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
