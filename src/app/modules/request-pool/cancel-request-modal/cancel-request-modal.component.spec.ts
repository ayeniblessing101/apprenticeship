import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelRequestModalComponent } from './cancel-request-modal.component';
import { RequestService } from 'app/services/request.service';

import { RequestServiceStub } from '../../../stubs/request-stub.service';

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
