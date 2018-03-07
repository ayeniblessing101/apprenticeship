import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { NoSearchResultComponent } from '../no-search-result/no-search-result.component';
import { RequestService } from './../../../services/request.service';
import { RequestServiceStub } from '../../../stubs/request-stub.service';
import { HttpService as Http } from '../../../services/http.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { CalendarComponent } from '../calendar/calendar.component';
import { SessionService } from '../../../services/session.service';
import { InProgressComponent } from './in-progress.component';
import { RequestDurationPipe } from '../../../pipes/request-duration.pipe';
import { RequestSkillPipe } from '../../../pipes/request-skills-pipe';
import { SortingHelper } from '../../../helpers/sorting.helper';
import { SetRequestHeaderIconDirective } from '../../../directives/set-request-header-icon.directive';

describe('InProgressComponent', () => {
  let component: InProgressComponent;
  let fixture: ComponentFixture<InProgressComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  }
  let requestDuration: RequestDurationPipe;
  let requestSkill: RequestSkillPipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      declarations: [
        InProgressComponent,
        NoSearchResultComponent,
        CalendarComponent,
        RequestDurationPipe,
        RequestSkillPipe,
        SetRequestHeaderIconDirective,
      ],
      providers: [
        Http,
        { provide: RequestService, useClass: RequestServiceStub },
        { provide: Router, useValue: mockRouter },
        RequestService,
        UserService,
        SessionService,
        SortingHelper,
      ],
    })
      .compileComponents();
    requestDuration = new RequestDurationPipe;
    requestSkill = new RequestSkillPipe;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InProgressComponent);
    component = fixture.componentInstance;
    component.sessionDates = [];
    component.activeSortCategory = {};
    component.sortCategoryValues = {
      title: 'asc',
      duration: 'asc',
      location:  'asc',
      role: 'asc',
      created_at: 'asc',
    };
    fixture.detectChanges();
  });

  it('should create a component InProgress', () => {
    expect(component).toBeTruthy();
  });
});
