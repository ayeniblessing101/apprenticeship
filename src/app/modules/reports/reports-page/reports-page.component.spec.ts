import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { RequestService } from '../../../services/request.service'
import { SkillService } from '../../../services/skill.service';
import { ReportsService } from '../../../services/reports.service';
import { UserService } from '../../../services/user.service';
import { HttpService as Http } from '../../../services/http.service';

import { ReportsPageComponent } from './reports-page.component';
import { RequestCountBarChartComponent } from '../request-count-bar-chart/request-count-bar-chart.component';
import { InactiveMentorshipGraphComponent } from '../inactive-mentorship/inactive-mentorship-graph.component';
import { DropDownComponent } from '../../shared/drop-down/drop-down.component';
import { CalendarPickerComponent } from '../../shared/calendar/calendar-picker.component';
import { SkillServiceStub } from '../../../stubs/skill-stub.service';

describe('RequestSkillsReportComponent', () => {
  let component: ReportsPageComponent;
  let fixture: ComponentFixture<ReportsPageComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      declarations: [
        ReportsPageComponent,
        RequestCountBarChartComponent,
        DropDownComponent,
        CalendarPickerComponent,
        InactiveMentorshipGraphComponent,
      ],
      providers: [
        SkillService,
        Http,
        ReportsService,
        UserService,
        RequestService,
        { provide: SkillService, useClass: SkillServiceStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsPageComponent);
    component = fixture.componentInstance;
    component.skillStatusCountReport = [];
    component.startDate = '';
    component.endDate = '';
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
})
