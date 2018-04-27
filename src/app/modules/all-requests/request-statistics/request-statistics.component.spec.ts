import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpModule, XHRBackend } from '@angular/http';
import { RequestStatisticsComponent } from './request-statistics.component';
import { RequestService } from './../../../services/request.service';
import { RequestServiceStub } from '../../../stubs/request-stub.service';
import { HttpService as Http } from '../../../services/http.service';
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';
import { DateRangePickerComponent } from '../../../modules/shared/date-range-picker/date-range-picker.component';
import { DropDownComponent } from '../../shared/drop-down/drop-down.component';
import { ExportButtonComponent } from '../../shared/export-button/export-button.component';
import { CSVDownloadHelper } from '../../../helpers/csv-download.helper';
import { CalendarPickerComponent } from '../../shared/calendar/calendar-picker.component';


describe('RequestStaticsComponent', () => {
  let component: RequestStatisticsComponent;
  let fixture: ComponentFixture<RequestStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      declarations: [
        RequestStatisticsComponent,
        DateRangePickerComponent,
        DropDownComponent,
        ExportButtonComponent,
        CalendarPickerComponent,
      ],
      providers: [
        Http,
        CSVDownloadHelper,
        { provide: RequestService, useClass: RequestServiceStub },
        RequestService,
        AlertService,
        UserService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a component RequestStatistics', () => {
    expect(component).toBeTruthy();
  });
});
