import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { HistoryPageComponent } from './history-page.component';
import { RequestDetailsPageComponent } from '../request-details-page/request-details-page.component';
import { ProposedRequestDurationPipe } from '../../../pipes/proposed-request-duration.pipe';
import { RequestSkillPipe } from '../../../pipes/request-skills-pipe';

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
        RequestDetailsPageComponent,
        ProposedRequestDurationPipe,
        RequestSkillPipe,
      ],
      imports: [
        StarRatingModule.forRoot(),
      ],
      providers: [
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
