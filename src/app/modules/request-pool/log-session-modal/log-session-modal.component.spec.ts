import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogSessionModalComponent } from './log-session-modal.component';
import { HttpModule } from '@angular/http';
import { StarRatingModule } from 'angular-star-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RequestService } from '../../../services/request.service';
import { RequestServiceStub } from '../../../stubs/request-stub.service';
import { HttpService as Http } from '../../../services/http.service';
import { SharedModule } from '../../shared/shared.module';
import { SessionService } from '../../../services/session.service';
import { AlertService } from '../../../services/alert.service';

describe('LogSessionModalComponent', () => {
  let component: LogSessionModalComponent;
  let fixture: ComponentFixture<LogSessionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        StarRatingModule,
        FormsModule,
        ReactiveFormsModule,
        InfiniteScrollModule,
        SharedModule,
      ],
      declarations: [LogSessionModalComponent],
      providers: [
        { provide: RequestService, useClass: RequestServiceStub },
        Http,
        SessionService,
        AlertService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogSessionModalComponent);
    component = fixture.componentInstance;
    component.session = {};
    component.request = {
      pairing: {
        start_time: '01:34',
        end_time: '03:00',
      },
    }
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
