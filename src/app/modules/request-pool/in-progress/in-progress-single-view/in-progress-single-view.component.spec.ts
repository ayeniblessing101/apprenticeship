import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressSingleViewComponent } from './in-progress-single-view.component';
import { RequestService } from '../../../../services/request.service';
import { HttpModule } from '@angular/http';
import { HttpService as Http } from '../../../../services/http.service';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

describe('InProgressSingleViewComponent', () => {
  let component: InProgressSingleViewComponent;
  let fixture: ComponentFixture<InProgressSingleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InProgressSingleViewComponent],
      imports: [
        HttpModule,
      ],
      providers: [
        Http,
        {provide: ActivatedRoute, useValue: {
          params: Observable.of({ id: 8, title: 'Html & Css' }),
        }},
        RequestService, UserService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InProgressSingleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create in-progress-single-view component', () => {
    expect(component).toBeTruthy();
  });
});
