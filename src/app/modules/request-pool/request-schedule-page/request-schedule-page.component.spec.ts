import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RequestSchedulePageComponent } from './request-schedule-page.component';
import { SessionDetailsComponent } from '../session-details/session-details.component';
import { LogSessionModalComponent } from '../log-session-modal/log-session-modal.component';
import { UserService } from '../../../services/user.service';
import { RequestService } from '../../../services/request.service';
import { HttpService as Http } from '../../../services/http.service';
import { StarRatingModule } from 'angular-star-rating';
import { SharedModule } from '../../shared/shared.module';
import { UserServiceStub } from '../../../stubs/user-stub.service';

describe('SessionDetailsComponent', () => {
  let component: RequestSchedulePageComponent;
  let fixture: ComponentFixture<RequestSchedulePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        StarRatingModule,
        HttpModule,
      ],
      declarations: [
        RequestSchedulePageComponent,
        SessionDetailsComponent,
        LogSessionModalComponent,
      ],
      providers: [
        Http,
        { provide: UserService, useClass: UserServiceStub },
        RequestService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestSchedulePageComponent);
    component = fixture.componentInstance;
    component.sessions = [];
    component.request = { id: 2 };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
