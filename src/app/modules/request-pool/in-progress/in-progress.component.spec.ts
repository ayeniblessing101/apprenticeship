import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpModule, XHRBackend } from '@angular/http';

import { InProgressComponent } from './in-progress.component';
import { NoSearchResultComponent } from '../no-search-result/no-search-result.component';
import { RequestService } from './../../../services/request.service';
import { RequestServiceStub } from '../../../stubs/request-stub.service';
import { HttpService as Http } from '../../../services/http.service';
import { UserService } from '../../../services/user.service';


describe('InProgressComponent', () => {
  let component: InProgressComponent;
  let fixture: ComponentFixture<InProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      declarations: [InProgressComponent, NoSearchResultComponent],
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
    fixture = TestBed.createComponent(InProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a component InProgress', () => {
    expect(component).toBeTruthy();
  });

});
