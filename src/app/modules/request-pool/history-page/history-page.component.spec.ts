import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import { HttpService as Http } from '../../../services/http.service';
import { UserService } from '../../../services/user.service';
import { RequestService } from '../../../services/request.service';
import { FileService } from '../../../services/files.service';
import { RequestSchedulePageComponent } from '../request-schedule-page/request-schedule-page.component';
import { HistoryPageComponent } from './history-page.component';
import { RequestDetailsPageComponent } from '../request-details-page/request-details-page.component';
import { ProposedRequestDurationPipe } from '../../../pipes/proposed-request-duration.pipe';
import { RequestSkillPipe } from '../../../pipes/request-skills-pipe';
import { SessionDetailsComponent } from '../session-details/session-details.component';
import { LogSessionModalComponent } from '../log-session-modal/log-session-modal.component';

describe('HistoryPageComponent', () => {
  let component: HistoryPageComponent;
  let fixture: ComponentFixture<HistoryPageComponent>;
  let proposedRequestDuration: ProposedRequestDurationPipe;
  let requestSkill: RequestSkillPipe;
  const routeStub = new Observable((data) => { });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HistoryPageComponent,
        LogSessionModalComponent,
        SessionDetailsComponent,
        RequestDetailsPageComponent,
        RequestSchedulePageComponent,
        ProposedRequestDurationPipe,
        RequestSkillPipe,
      ],
      imports: [
        StarRatingModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
      ],
      providers: [
        RequestService,
        FileService,
        UserService,
        Http,
        { provide: ActivatedRoute, useValue: { data: routeStub } },
      ],
    })
      .compileComponents();
    proposedRequestDuration = new ProposedRequestDurationPipe;
    requestSkill = new RequestSkillPipe;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPageComponent);
    component = fixture.componentInstance;
    component.request = {
      id: 1,
      duration: '2',
      request_skills: [{ id: 1, primary: 'Adobe' }],
      location: 'Kampala',
      pairing: { days: ['monday'] },
    };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
