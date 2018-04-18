import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillTopMentorsComponent } from './skill-top-mentors.component';
import { NoResultComponent } from '../../shared/no-result/no-result.component';
import { SkillService } from '../../../services/skill.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

describe('SkillTopMentorsComponent', () => {
  let component: SkillTopMentorsComponent;
  let fixture: ComponentFixture<SkillTopMentorsComponent>;
  const skillService = {
    getSkillTopMentors: () => Observable.of({}),
  };
  const routerStub = {
    navigate: jasmine.createSpy('admin/skills/3/mentors'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        SkillTopMentorsComponent,
        NoResultComponent,
      ],
      providers: [
        { provide: SkillService, useValue: skillService },
        { provide: Router, useValue: routerStub },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillTopMentorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a component SkillRequests', () => {
    expect(component).toBeTruthy();
  });
});
