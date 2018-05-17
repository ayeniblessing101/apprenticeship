import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelRequestModalComponent } from './cancel-request-modal.component';
import { RequestService } from 'app/services/request.service';
import { NotificationService } from 'app/services/notifications.service';

import { RequestServiceStub } from '../../../stubs/request-stub.service';
import {  NotificationServiceStub } from '../../../stubs/notification-stub.service';

describe('CancelRequestModalComponent', () => {
  class AuthServiceMock {
    userInfo = { id: 'TestID' };
  }
  let component: CancelRequestModalComponent;
  let fixture: ComponentFixture<CancelRequestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CancelRequestModalComponent,
      ],
      providers: [
        { provide: RequestService, useClass: RequestServiceStub },
        { provide: NotificationService, useClass: NotificationServiceStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelRequestModalComponent);
    component = fixture.componentInstance;
    component.request = {};
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
