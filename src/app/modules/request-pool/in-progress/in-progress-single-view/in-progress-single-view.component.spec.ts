import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestService } from '../../../../services/request.service';
import { HttpModule } from '@angular/http';
import { HttpService as Http } from '../../../../services/http.service';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CalendarComponent } from '../calendar/calendar.component';
import { SharedModule } from '../../../shared/shared.module';
import { SessionService } from '../../../../services/session.service';
import { InProgressSingleViewComponent } from './in-progress-single-view.component';
import { StarRatingModule } from 'angular-star-rating';
import { RequestDetailsPageComponent } from '../../request-details-page/request-details-page.component';
import { RequestSchedulePageComponent } from '../../request-schedule-page/request-schedule-page.component';
import { ProposedRequestDurationPipe } from '../../../../pipes/proposed-request-duration.pipe';
import { RequestSkillPipe } from '../../../../pipes/request-skills-pipe';

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
        CalendarComponent,
        ProposedRequestDurationPipe,
        RequestSkillPipe,
      ],
      imports: [
        SharedModule,
        HttpModule,
        StarRatingModule.forRoot(),
      ],

      providers: [
        Http,
        {provide: ActivatedRoute, useValue: {
          data: routeStub,
        }},
        RequestService,
        UserService,
        SessionService,
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
