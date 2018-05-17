import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSessionModalComponent } from './confirm-session-modal.component';
import { HttpModule } from '@angular/http';
import { StarRatingModule } from 'angular-star-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionService } from '../../../services/session.service';
import { AlertService } from '../../../services/alert.service';
import { NotificationService } from '../../../services/notifications.service';
import { HttpService as Http } from '../../../services/http.service';
import { RequestService } from '../../../services/request.service';
import { RequestServiceStub } from '../../../stubs/request-stub.service';
import { NotificationServiceStub } from '../../../stubs/notification-stub.service';
import { UserService } from '../../../services/user.service';

describe('ConfirmSessionModalComponent', () => {
  let component: ConfirmSessionModalComponent;
  let fixture: ComponentFixture<ConfirmSessionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        StarRatingModule,
        FormsModule,
        ReactiveFormsModule,
        StarRatingModule,
      ],
      declarations: [ConfirmSessionModalComponent],
      providers: [
        { provide: RequestService, useClass: RequestServiceStub },
        { provide: NotificationService, useClass: NotificationServiceStub },
        Http,
        SessionService,
        AlertService,
        UserService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSessionModalComponent);
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
    };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
