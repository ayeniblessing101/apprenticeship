import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpModule, RequestOptions, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { PoolComponent } from './pool.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RequestService } from './../../../services/request.service';
import { RequestServiceStub } from '../../../stubs/request-stub.service';
import { HttpService as Http } from '../../../services/http.service';
import { HelperService } from '../../../services/helper.service';

describe('PoolComponent', () => {
  let component: PoolComponent;
  let fixture: ComponentFixture<PoolComponent>;
  let pageTitle: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        InfiniteScrollModule,
        HttpModule,
      ],
      declarations: [ PoolComponent ],
      providers: [
        Http,
        { provide: RequestService, useClass: RequestServiceStub },
        RequestService,
        HelperService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

});