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

describe('PendingRequestsTableComponent', () => {
  let component: PendingRequestsTableComponent;
  let fixture: ComponentFixture<PendingRequestsTableComponent>;

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
      ],
      providers: [
        UserService,
        Http,
        { provide: RequestService, useClass: RequestServiceStub },
        RequestService,
      ],
    })
      .compileComponents();
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
