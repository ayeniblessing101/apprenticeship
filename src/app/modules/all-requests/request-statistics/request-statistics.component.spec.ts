import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpModule, XHRBackend } from '@angular/http';

import { RequestStatisticsComponent } from './request-statistics.component';
import { RequestService } from './../../../services/request.service';
import { RequestServiceStub } from '../../../stubs/request-stub.service';
import { HttpService as Http } from '../../../services/http.service';
import { UserService } from '../../../services/user.service';

describe('RequestStaticsComponent', () => {
  let component: RequestStatisticsComponent;
  let fixture: ComponentFixture<RequestStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      declarations: [RequestStatisticsComponent],
      providers: [
        Http,
        { provide: RequestService, useClass: RequestServiceStub },
        RequestService,
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
