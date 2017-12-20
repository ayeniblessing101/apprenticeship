import { HttpService as Http } from './../../../services/http.service';
import { RequestServiceStub } from './../../../stubs/request-stub.service';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingComponent } from './pending.component';
import { PendingModalComponent } from './../pending-modal/pending-modal.component';
import { PendingRequestsTableComponent } from './../pending-requests-table/pending-requests-table.component';
import { StarRatingModule } from 'angular-star-rating';
import { RequestService } from 'app/services/request.service';
import { UserService } from 'app/services/user.service';
import { NoSearchResultComponent } from '../no-search-result/no-search-result.component';

describe('PendingComponent', () => {
  let component: PendingComponent;
  let fixture: ComponentFixture<PendingComponent>;

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
        NoSearchResultComponent,
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
    fixture = TestBed.createComponent(PendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
