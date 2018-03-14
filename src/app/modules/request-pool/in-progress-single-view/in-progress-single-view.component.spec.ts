import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestService } from '../../../services/request.service';
import { HttpModule } from '@angular/http';
import { HttpService as Http } from '../../../services/http.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CalendarComponent } from '../calendar/calendar.component';
import { SessionService } from '../../../services/session.service';
import { FileService } from '../../../services/files.service';
import { InProgressSingleViewComponent } from './in-progress-single-view.component';
import { StarRatingModule } from 'angular-star-rating';
import { ProposedRequestDurationPipe } from '../../../pipes/proposed-request-duration.pipe';
import { RequestSkillPipe } from '../../../pipes/request-skills-pipe';
import { RequestDetailsPageComponent } from '../request-details-page/request-details-page.component';
import { RequestSchedulePageComponent } from '../request-schedule-page/request-schedule-page.component';
import { AddFileModalComponent } from '../add-file-modal/add-file-modal.component';
import { SessionDetailsComponent } from '../session-details/session-details.component';
import { LogSessionModalComponent } from '../log-session-modal/log-session-modal.component';
import { ConfirmSessionModalComponent } from '../confirm-session-modal/confirm-session-modal.component';

describe('InProgressSingleViewComponent', () => {
  let component: InProgressSingleViewComponent;
  let fixture: ComponentFixture<InProgressSingleViewComponent>;
  const routeStub = new Observable((data) => { });
  let proposedRequestDuration: ProposedRequestDurationPipe;
  let requestSkill: RequestSkillPipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InProgressSingleViewComponent,
        RequestDetailsPageComponent,
        RequestSchedulePageComponent,
        AddFileModalComponent,
        CalendarComponent,
        ProposedRequestDurationPipe,
        RequestSkillPipe,
        SessionDetailsComponent,
        LogSessionModalComponent,
        ConfirmSessionModalComponent,
      ],
      imports: [
        HttpModule,
        FormsModule,
        StarRatingModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
      ],

      providers: [
        Http,
        {provide: ActivatedRoute, useValue: {
          data: routeStub,
        }},
        RequestService,
        UserService,
        SessionService,
        FileService,
      ],
    })
      .compileComponents();
    proposedRequestDuration = new ProposedRequestDurationPipe;
    requestSkill = new RequestSkillPipe;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InProgressSingleViewComponent);
    component = fixture.componentInstance;
    component.sessionDates = [];
    component.request = {
      id: 1,
      duration: '2',
      request_skills : [{ id : 1, primary: 'Adobe' }],
      location : 'Kampala',
      pairing: { days: ['monday'] },
    };
    fixture.detectChanges();
  });

  it('should create in-progress-single-view component', () => {
    expect(component).toBeTruthy();
  });
});
