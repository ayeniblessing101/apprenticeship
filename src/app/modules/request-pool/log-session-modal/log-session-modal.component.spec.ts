import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogSessionModalComponent } from './log-session-modal.component';
import { HttpModule } from '@angular/http';
import { StarRatingModule } from 'angular-star-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestService } from '../../../services/request.service';
import { RequestServiceStub } from '../../../stubs/request-stub.service';
import { HttpService as Http } from '../../../services/http.service';
import { SharedModule } from '../../shared/shared.module';
import { SessionService } from '../../../services/session.service';
import { AlertService } from '../../../services/alert.service';
import { UserService } from 'app/services/user.service';
import { UserServiceStub } from '../../../stubs/user-stub.service';

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
        SharedModule,
      ],
      declarations: [LogSessionModalComponent],
      providers: [
        { provide: RequestService, useClass: RequestServiceStub },
        { provide: UserService, useClass: UserServiceStub },
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
      id: 2,
      mentee: { id: 1 },
      mentor: { id: 1 },
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
