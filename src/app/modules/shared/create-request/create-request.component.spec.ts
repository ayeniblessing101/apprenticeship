import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { CreateRequestComponent } from './create-request.component';
import { AlertService } from '../../../services/alert.service';
import { RequestService } from 'app/services/request.service';
import { UserService } from 'app/services/user.service';
import { HttpService as Http } from '../../../services/http.service';
import { SkillService } from '../../../services/skill.service';


describe('CreateRequestComponent', () => {
  let component: CreateRequestComponent;
  let fixture: ComponentFixture<CreateRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        FormsModule,
        Ng2AutoCompleteModule,
      ],
      declarations: [CreateRequestComponent],
      providers: [
        Http,
        UserService,
        AlertService,
        SkillService,
        RequestService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
