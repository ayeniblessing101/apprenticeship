import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { InactiveMentorshipGraphComponent } from './inactive-mentorship-graph.component';
import { ReportsService } from 'app/services/skill.service';
import { RequestService } from 'app/services/request.service';
import { UserService } from 'app/services/user.service'
import { HttpService as Http } from '../../../services/http.service';

describe('InactiveMentorshipGraphComponent', () => {
  let component: InactiveMentorshipGraphComponent;
  let fixture: ComponentFixture<InactiveMentorshipGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      declarations: [InactiveMentorshipGraphComponent],
      providers: [
        Http,
        ReportsService,
        RequestService,
        UserService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveMentorshipGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
