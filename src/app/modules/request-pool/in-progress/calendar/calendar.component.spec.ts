import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { HttpModule } from '@angular/http';
import { RequestService } from '../../../../services/request.service';
import { HttpService as Http } from '../../../../services/http.service';
import { RequestServiceStub } from '../../../../stubs/request-stub.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FilterService } from '../../../../services/filter.service';
import { SharedModule } from '../../../shared/shared.module';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        InfiniteScrollModule,
        SharedModule,
        HttpModule,
      ],
      declarations: [
        CalendarComponent,
      ],
      providers: [
        Http,
        { provide: RequestService, useClass: RequestServiceStub },
        RequestService,
        FilterService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    component.sessionDates = [];
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

