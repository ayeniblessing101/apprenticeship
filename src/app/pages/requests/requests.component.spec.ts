import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule, RequestOptions, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { RequestsComponent } from './requests.component';
import { HttpService as Http } from '../../services/http.service';
import { RequestService } from '../../services/request.service';
import { RequestServiceStub } from '../../stubs/request-stub.service';
import { SegmentService } from '../../services/segment.service';
import { SkillService } from '../../services/skill.service';
import { UserService } from '../../services/user.service';
import { SkillServiceStub } from '../../stubs/skill-stub.service';
import mockSkills from '../../mocks/skills';

describe('CreateRequestComponent', () => {
  let component: RequestsComponent;
  let fixture: ComponentFixture<RequestsComponent>;
  let debug: DebugElement;
  let pageTitle: HTMLElement;
  let submitBtn: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestsComponent],
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        Http,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: SkillService, useClass: SkillServiceStub },
        { provide: RequestService, useClass: RequestServiceStub },
        MockBackend,
        RequestService,
        SegmentService,
        UserService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;

    // elements
    pageTitle = debug.query(By.css('h2')).nativeElement;
    submitBtn = debug.query(By.css('button')).nativeElement;
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeUndefined();
  });

  it('should not contain title before component loads', () => {
    expect(pageTitle.textContent).toEqual('');
  });

  it('should have a title after component loads', fakeAsync(() => {
    tick();
    fixture.detectChanges();
    expect(pageTitle.textContent).toContain('Request For A Mentor');
    expect(component.form).toBeDefined();
  }));

  it('should populate lengthOfMentorship array', () => {
    expect(component.lengthOfMentorship.length).toEqual(12);
    expect(Array.isArray(component.lengthOfMentorship)).toBeTruthy();
  });

  it('should populate daysOfAvailability array', () => {
    expect(component.daysOfAvailability.length).toEqual(5);
    expect(Array.isArray(component.daysOfAvailability)).toBeTruthy();
  });

  it('should configure snackbar after component loads', () => {
    expect(component.snackBarConfig.duration).toEqual(3000);
  });

  it('should not populate skills array before component loads', fakeAsync(() => {
    expect(component.skills.length).toEqual(0);
  }));

  it('should call fetchSkills() after component loads', fakeAsync(() => {
    spyOn(component, 'fetchSkills');

    tick();
    fixture.detectChanges()
    expect(component.fetchSkills).toHaveBeenCalled();
  }));

  it('should populate skills array after component loads', fakeAsync(() => {
    tick();
    fixture.detectChanges();
    expect(component.skills.length).toEqual(3);
  }));

  it('should change text of button when button is clicked', fakeAsync(() => {
    submitBtn.click();
    fixture.whenStable()
       .then(() => {
         expect(component.buttonText).toEqual('Creating Request...');
       }).catch((err) => {
         expect(component.buttonText).toEqual('Creating Request');
         expect(component.snackBarConfig.duration).toEqual(3000);
       });
  }));

  it('should call requestMentor() method on form submit', fakeAsync(() => {
    const requestMentorSpy = spyOn(component, 'requestMentor');

    submitBtn.click();
    fixture.whenStable()
      .then(() => {
        expect(requestMentorSpy.calls.any()).toBeTruthy();
        expect(component.requestMentor).toHaveBeenCalled();
      });
  }));

});
