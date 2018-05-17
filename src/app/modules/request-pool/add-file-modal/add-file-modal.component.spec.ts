import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFileModalComponent } from './add-file-modal.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FileService } from '../../../services/files.service';
import { HttpService as Http } from '../../../services/http.service';
import { AlertService } from '../../../services/alert.service';
import { SessionService } from '../../../services/session.service';
import { NotificationService } from '../../../services/notifications.service';
import { UserService } from '../../../services/user.service';

const createSpy = jasmine.createSpy;

describe('AddFileModalComponent', () => {
  let component: AddFileModalComponent;
  let fixture: ComponentFixture<AddFileModalComponent>;
  let fileServiceStub,
    sessionServiceStub,
    alertServiceStub,
    notificationServiceStub,
    ngFormMock;

  beforeEach(async(() => {
    ngFormMock = {
      value: { fileTitle: '   File Title' },
      _submitted: createSpy('submitted'),
    };

    this.thenMock = {
      then: createSpy('then'),
    };

    this.promiseMock = {
      toPromise: createSpy('toPromise').and.returnValue(this.thenMock),
    };

    sessionServiceStub = {
      createSession: createSpy('createSession').and.returnValue(this.promiseMock),
    };

    fileServiceStub = {
      addFile: createSpy('addFile').and.returnValue(this.promiseMock),
    };

    spyOn(FormData.prototype, 'append');

    alertServiceStub = {
      showMessage: createSpy('showMessage'),
    };

    TestBed.configureTestingModule({
      declarations: [
        AddFileModalComponent,
      ],
      imports: [
        FormsModule,
        HttpModule,
      ],
      providers: [
        { provide: FileService, useValue: fileServiceStub },
        Http,
        UserService,
        { provide: AlertService, useValue: alertServiceStub },
        { provide: SessionService, useValue: sessionServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.requestId = 1;
    component.sessionDate = '12/12/2018';
    component.sessionId = 1;
    component.file = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
    });
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should create a session and upload a file', () => {
    spyOn(component, 'uploadFile');
    component.sessionId = null;

    component.submitForm(ngFormMock);
    expect(component.uploadedFileName).toEqual('File Title');
    expect(FormData.prototype.append).toHaveBeenCalledWith('date', component.sessionDate);
    expect(sessionServiceStub.createSession).toHaveBeenCalledWith(jasmine.any(FormData), component.requestId);
    expect(this.promiseMock.toPromise).toHaveBeenCalled();
    expect(this.thenMock.then).toHaveBeenCalledWith(jasmine.any(Function));

    this.thenMock.then.calls.mostRecent().args[0]({ id: 1 });
    expect(component.sessionId).toEqual(1);

    expect(component.uploadFile).toHaveBeenCalled()
  });

  it('should not create a session but upload a file', () => {
    spyOn(component, 'uploadFile');

    component.submitForm(ngFormMock);
    expect(component.uploadedFileName).toEqual('File Title');
    expect(FormData.prototype.append).not.toHaveBeenCalledWith('date', component.sessionDate);
    expect(sessionServiceStub.createSession).not.toHaveBeenCalledWith(jasmine.any(FormData), component.requestId);
    expect(this.promiseMock.toPromise).not.toHaveBeenCalled();
    expect(this.thenMock.then).not.toHaveBeenCalledWith(jasmine.any(Function));

    expect(component.uploadFile).toHaveBeenCalled()
  });

  it('should upload a file when file size does not exceed required file size',
     () => {
       component.maxFileSize = 4;

       component.submitForm(ngFormMock);
       expect(component.uploadedFileName).toEqual('File Title');
       expect(FormData.prototype.append).toHaveBeenCalledWith('file', component.file);
       expect(FormData.prototype.append).toHaveBeenCalledWith('name', component.uploadedFileName);
       expect(fileServiceStub.addFile).toHaveBeenCalledWith(jasmine.any(FormData), component.sessionId);
       expect(this.promiseMock.toPromise).toHaveBeenCalled();
       expect(this.thenMock.then).toHaveBeenCalledWith(jasmine.any(Function));
     });

  it('should fail to upload file when file size is exceeded',
     () => {
       component.maxFileSize = 1;
       component.submitForm(ngFormMock);

       const errorMessage = 'File size limit of 5MB has been exceeded, please try again.';
       expect(alertServiceStub.showMessage).toHaveBeenCalledWith(errorMessage);
     });
});
