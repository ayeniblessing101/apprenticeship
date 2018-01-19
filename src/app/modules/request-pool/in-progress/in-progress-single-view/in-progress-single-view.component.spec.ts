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

describe('InProgressSingleViewComponent', () => {
  let component: InProgressSingleViewComponent;
  let fixture: ComponentFixture<InProgressSingleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpModule,
      ],
      declarations: [
        InProgressSingleViewComponent,
        CalendarComponent,
      ],
      providers: [
        Http,
        {provide: ActivatedRoute, useValue: {
          params: Observable.of({ id: 8, title: 'Html & Css' }),
        }},
        RequestService,
        UserService,
        SessionService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InProgressSingleViewComponent);
    component = fixture.componentInstance;
    component.sessionDates = [];
    fixture.detectChanges();
  });

  it('should create in-progress-single-view component', () => {
    expect(component).toBeTruthy();
  });
});
